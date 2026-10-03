import { cp, chmod, mkdir, stat } from "node:fs/promises";
import { select, checkbox } from "@inquirer/prompts";

interface TargetConfig {
  target: string;
  os: string;
  arch: string;
  outfile: string;
}

const TARGETS: TargetConfig[] = [
  {
    target: "bun-linux-x64",
    os: "Linux",
    arch: "x64",
    outfile: "./dist/katzu-welcome-linux-x64",
  },
  {
    target: "bun-linux-arm64",
    os: "Linux",
    arch: "arm64",
    outfile: "./dist/katzu-welcome-linux-arm64",
  },
  {
    target: "bun-darwin-x64",
    os: "macOS",
    arch: "x64 (Intel)",
    outfile: "./dist/katzu-welcome-darwin-x64",
  },
  {
    target: "bun-darwin-arm64",
    os: "macOS",
    arch: "arm64 (Apple Silicon)",
    outfile: "./dist/katzu-welcome-darwin-arm64",
  },
  {
    target: "bun-windows-x64",
    os: "Windows",
    arch: "x64",
    outfile: "./dist/katzu-welcome-windows-x64.exe",
  },
];

async function formatFileSize(filePath: string): Promise<string> {
  try {
    const fileStat = await stat(filePath);
    const mb = fileStat.size / (1024 * 1024);
    if (mb >= 1) {
      return `${mb.toFixed(2)} MB`;
    }
    const kb = fileStat.size / 1024;
    return `${kb.toFixed(2)} KB`;
  } catch {
    return "unknown size";
  }
}

async function buildJsBundle(): Promise<void> {
  console.log("📦 Bundling JavaScript package to ./dist...");

  const result = await Bun.build({
    entrypoints: ["./index.ts"],
    outdir: "./dist",
    target: "node",
    minify: true,
    sourcemap: "external",
  });

  if (!result.success) {
    console.error("❌ JavaScript bundle failed:");
    for (const log of result.logs) {
      console.error(log);
    }
    throw new Error("JS bundle failed");
  }

  // Copy type declarations
  try {
    await cp("./type.d.ts", "./dist/index.d.ts");
    await cp("./type.d.ts", "./dist/type.d.ts");
  } catch (err) {
    console.warn("⚠️ Warning copying type definitions:", err);
  }

  // Make index.js executable
  try {
    await chmod("./dist/index.js", 0o755);
  } catch {
    // Ignore on filesystems without POSIX permissions
  }

  const jsSize = await formatFileSize("./dist/index.js");
  console.log(`   ✓ index.js (${jsSize})`);
  console.log("   ✓ index.d.ts (TypeScript definitions)");
}

async function compileBinary(target: TargetConfig): Promise<void> {
  const startTime = Date.now();
  console.log(`🚀 Compiling binary for ${target.os} ${target.arch} (${target.target})...`);

  const proc = Bun.spawn([
    "bun",
    "build",
    "./index.ts",
    "--compile",
    `--target=${target.target}`,
    `--outfile=${target.outfile}`,
    "--minify",
  ], {
    stdout: "ignore",
    stderr: "inherit",
  });

  const exitCode = await proc.exited;
  if (exitCode !== 0) {
    throw new Error(`Failed to compile binary for ${target.target} (exit code ${exitCode})`);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const size = await formatFileSize(target.outfile);
  const filename = target.outfile.split("/").pop();
  console.log(`   ✓ ${filename} [${target.os} ${target.arch}] (${size}) in ${elapsed}s`);
}

async function promptBuildChoice(): Promise<{ buildJs: boolean; targetsToBuild: TargetConfig[] }> {
  const choice = await select({
    message: "Select build target:",
    choices: [
      {
        name: "🚀 Build All (JS Bundle + All 5 OS/Arch Binaries)",
        value: "all",
        description: "Compiles index.js and standalone executables for Linux, macOS, and Windows",
      },
      {
        name: "🐧 Linux x64 (Intel/AMD)",
        value: "bun-linux-x64",
        description: "Standalone binary for 64-bit Linux",
      },
      {
        name: "🐧 Linux ARM64 (aarch64)",
        value: "bun-linux-arm64",
        description: "Standalone binary for ARM64 Linux (Raspberry Pi, AWS Graviton)",
      },
      {
        name: "🍎 macOS ARM64 (Apple Silicon)",
        value: "bun-darwin-arm64",
        description: "Standalone binary for Apple Silicon Macs (M1/M2/M3/M4)",
      },
      {
        name: "🍎 macOS x64 (Intel)",
        value: "bun-darwin-x64",
        description: "Standalone binary for Intel Macs",
      },
      {
        name: "🪟 Windows x64 (.exe)",
        value: "bun-windows-x64",
        description: "Standalone executable for 64-bit Windows",
      },
      {
        name: "📦 JavaScript Bundle Only (dist/index.js)",
        value: "js-only",
        description: "Builds minified JS bundle with TypeScript definitions",
      },
      {
        name: "🎯 Custom Selection (Checkbox)",
        value: "custom",
        description: "Choose multiple specific targets using checkboxes",
      },
    ],
  });

  if (choice === "all") {
    return { buildJs: true, targetsToBuild: TARGETS };
  }

  if (choice === "js-only") {
    return { buildJs: true, targetsToBuild: [] };
  }

  if (choice === "custom") {
    const selectedTargets = await checkbox({
      message: "Select OS & architecture targets to compile:",
      choices: TARGETS.map((t) => ({
        name: `${t.os} ${t.arch} (${t.target})`,
        value: t.target,
        checked: true,
      })),
    });

    const targetsToBuild = TARGETS.filter((t) => selectedTargets.includes(t.target));
    return { buildJs: true, targetsToBuild };
  }

  // Single target selected
  const singleTarget = TARGETS.find((t) => t.target === choice);
  return {
    buildJs: false,
    targetsToBuild: singleTarget ? [singleTarget] : [],
  };
}

async function main() {
  const args = process.argv.slice(2);
  const isInteractive = Boolean(process.stdin.isTTY) && !args.includes("--no-prompt");

  let buildJs = false;
  let targetsToBuild: TargetConfig[] = [];

  await mkdir("./dist", { recursive: true });

  // Handle explicit CLI flags
  if (args.includes("--all")) {
    buildJs = true;
    targetsToBuild = TARGETS;
  } else if (args.includes("--js-only")) {
    buildJs = true;
    targetsToBuild = [];
  } else if (args.includes("--bin-only")) {
    buildJs = false;
    targetsToBuild = TARGETS;
  } else if (args.some((arg) => arg.startsWith("--target="))) {
    const targetArg = args.find((arg) => arg.startsWith("--target="))?.split("=")[1];
    const match = TARGETS.find((t) => t.target === targetArg);
    if (!match) {
      console.error(`❌ Unknown target "${targetArg}". Supported targets:\n${TARGETS.map((t) => `   - ${t.target}`).join("\n")}`);
      process.exit(1);
    }
    targetsToBuild = [match];
  } else if (isInteractive) {
    const promptResult = await promptBuildChoice();
    buildJs = promptResult.buildJs;
    targetsToBuild = promptResult.targetsToBuild;
  } else {
    // Non-interactive fallback default (e.g. CI pipeline)
    buildJs = true;
    targetsToBuild = TARGETS;
  }

  if (!buildJs && targetsToBuild.length === 0) {
    console.log("No targets selected to build.");
    return;
  }

  const startTime = Date.now();

  try {
    if (buildJs) {
      await buildJsBundle();
      if (targetsToBuild.length > 0) {
        console.log("");
      }
    }

    if (targetsToBuild.length > 0) {
      console.log(`⚙️  Compiling standalone executables (${targetsToBuild.length} target${targetsToBuild.length > 1 ? "s" : ""}):`);
      for (const target of targetsToBuild) {
        await compileBinary(target);
      }
      console.log("");
    }

    const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`🎉 Build completed successfully in ${totalElapsed}s!`);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "name" in err && err.name === "ExitPromptError") {
      console.log("\n👋 Build cancelled.");
      process.exit(0);
    }
    console.error("\n❌ Build failed:", err);
    process.exit(1);
  }
}

main().catch((err: unknown) => {
  if (err && typeof err === "object" && "name" in err && err.name === "ExitPromptError") {
    console.log("\n👋 Build cancelled.");
    process.exit(0);
  }
  console.error("\n❌ Unexpected error:", err);
  process.exit(1);
});
