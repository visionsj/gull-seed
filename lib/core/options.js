import _ from 'lodash'
import { join, resolve } from 'path'
import { existsSync } from 'fs'
import { isUrl } from 'utils'

export default function Options (_options) {
  // Clone options to prevent unwanted side-effects
  const options = Object.assign({}, _options)

  // Normalize options
  if (options.loading === true) {
    delete options.loading
  }
  if (options.router && typeof options.router.middleware === 'string') {
    options.router.middleware = [options.router.middleware]
  }
  if (options.router && typeof options.router.base === 'string') {
    options._routerBaseSpecified = true
  }
  if (typeof options.transition === 'string') {
    options.transition = { name: options.transition }
  }

  // Apply defaults
  _.defaultsDeep(options, defaultOptions)

  // Resolve dirs
  options.rootDir = (typeof options.rootDir === 'string' && options.rootDir ? options.rootDir : process.cwd())
  options.srcDir = (typeof options.srcDir === 'string' && options.srcDir ? resolve(options.rootDir, options.srcDir) : options.rootDir)
  options.buildDir = join(options.rootDir, options.buildDir)

  // If app.html is defined, set the template path to the user template
  options.appTemplatePath = resolve(options.buildDir, 'views/app.template.html')
  if (existsSync(join(options.srcDir, 'app.html'))) {
    options.appTemplatePath = join(options.srcDir, 'app.html')
  }

  // Ignore publicPath on dev
  /* istanbul ignore if */
  if (options.dev && isUrl(options.build.publicPath)) {
    options.build.publicPath = defaultOptions.build.publicPath
  }

  // If store defined, update store options to true unless explicitly disabled
  if (options.store !== false && existsSync(join(options.srcDir, 'store'))) {
    options.store = true
  }

  // Resolve mode
  let mode = options.mode
  if (typeof mode === 'function') {
    mode = mode()
  }
  if (typeof mode === 'string') {
    mode = Modes[mode]
  }

  // Apply mode
  _.defaultsDeep(options, mode)

  return options
}

const Modes = {
  universal: {
    build: {
      ssr: true
    },
    render: {
      ssr: true
    }
  },
  spa: {
    build: {
      ssr: false
    },
    render: {
      ssr: false
    }
  },
  static: {
    build: {
      ssr: true
    },
    render: {
      ssr: 'static'
    }
  }
}

export const defaultOptions = {
  mode: 'universal',
  dev: process.env.NODE_ENV !== 'production',
  buildDir: '.nuxt',
  nuxtAppDir: resolve(__dirname, '../lib/app/'), // Relative to dist
  build: {
    analyze: false,
    extractCSS: false,
    ssr: undefined,
    publicPath: '/_nuxt/',
    filenames: {
      css: 'common.[chunkhash].css',
      manifest: 'manifest.[hash].js',
      vendor: 'vendor.bundle.[chunkhash].js',
      app: 'nuxt.bundle.[chunkhash].js'
    },
    vendor: [],
    plugins: [],
    babel: {},
    postcss: undefined,
    templates: [],
    watch: [],
    devMiddleware: {},
    hotMiddleware: {}
  },
  generate: {
    dir: 'dist',
    routes: [],
    concurrency: 500,
    interval: 0,
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      removeAttributeQuotes: false,
      removeComments: false,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: false,
      removeStyleLinkTypeAttributes: false,
      removeTagWhitespace: false,
      sortAttributes: true,
      sortClassName: true,
      trimCustomFragments: true,
      useShortDoctype: true
    }
  },
  env: {},
  head: {
    meta: [],
    link: [],
    style: [],
    script: []
  },
  plugins: [],
  css: [],
  modules: [],
  layouts: {},
  serverMiddleware: [],
  ErrorPage: null,
  loading: {
    color: 'black',
    failedColor: 'red',
    height: '2px',
    duration: 5000
  },
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  router: {
    mode: 'history',
    base: '/',
    routes: [],
    middleware: [],
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    extendRoutes: null,
    scrollBehavior: null,
    fallback: false
  },
  render: {
    bundleRenderer: {},
    resourceHints: true,
    ssr: undefined,
    http2: {
      push: false
    },
    static: {},
    gzip: {
      threshold: 0
    },
    etag: {
      weak: true // Faster for responses > 5KB
    }
  },
  watchers: {
    webpack: {},
    chokidar: {}
  }
}
