import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, loadEnv } from "vite"
import react, { reactCompilerPreset } from "@vitejs/plugin-react"
import babel from "@rolldown/plugin-babel"

function supabasePreconnectTags(url: string | undefined) {
  if (!url) return ""

  try {
    const origin = new URL(url).origin
    return [
      `<link rel="preconnect" href="${origin}" crossorigin />`,
      `<link rel="dns-prefetch" href="${origin}" />`,
    ].join("\n    ")
  } catch {
    return ""
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const supabaseTags = supabasePreconnectTags(env.VITE_SUPABASE_URL)

  return {
    plugins: [
      react(),
      tailwindcss(),
      babel({ presets: [reactCompilerPreset()] }),
      {
        name: "html-performance-hints",
        transformIndexHtml(html) {
          const hints = [
            supabaseTags,
            '<link rel="preload" href="/hero-lcp.avif" as="image" type="image/avif" fetchpriority="high" />',
          ]
            .filter(Boolean)
            .join("\n    ")

          return html.replace("</head>", `    ${hints}\n  </head>`)
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: "es2022",
      cssMinify: true,
      sourcemap: false,
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return

            if (
              id.includes("@tiptap") ||
              id.includes("prosemirror") ||
              id.includes("@tiptap/")
            ) {
              return "vendor-editor"
            }
            if (id.includes("@supabase")) return "vendor-supabase"
            if (id.includes("browser-image-compression")) return "vendor-image"
            if (id.includes("embla-carousel")) return "vendor-carousel"
            if (id.includes("lucide-react")) return "vendor-icons"
            if (id.includes("radix-ui")) return "vendor-radix"
            if (
              id.includes("react-dom") ||
              id.includes("react-router") ||
              /[/\\]react[/\\]/.test(id)
            ) {
              return "vendor-react"
            }
          },
        },
      },
    },
  }
})
