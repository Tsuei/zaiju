<template>
  <div class="yinfu-root">
    <!-- 顶部链接行（横排小字） -->
    <header class="yinfu-topbar">
      <div class="topbar-inner">
        <span class="brand">{{ $site.title }}</span>
        <span class="sep">·</span>
        <span class="subtitle">{{ $site.description }}</span>
        <span class="spacer"></span>
        <a
          v-for="(link, i) in topLinks"
          :key="i"
          :href="link.link"
          :target="link.link.startsWith('http') ? '_blank' : '_self'"
        >
          [{{ link.text }}]
        </a>
        <span class="sep">|</span>
        <a href="#" @click.prevent="toggleMode">[{{ modeLabel }}]</a>
      </div>
    </header>

    <!-- 章节 tab 横排 -->
    <nav class="yinfu-tabs" v-if="chapters.length">
      <a
        v-for="(chap, i) in chapters"
        :key="i"
        :class="['tab', { active: i === current }]"
        @click="goTo(i)"
      >
        {{ chap.title }}
      </a>
    </nav>

    <!-- 主体：黑底 + 全文竖排 -->
    <main class="yinfu-body" ref="body">
      <div class="yinfu-scroll" :class="{ 'mode-vertical': vertical }">
        <div class="yinfu-page" :key="$route.path">
          <Content />
        </div>
      </div>
    </main>

    <!-- 底部滚动条 + 页码 -->
    <footer class="yinfu-footer" v-if="chapters.length > 1">
      <span class="footer-hint">滚动滚轮翻页 · 拖动滑块跳转 · 点击 tab 切换</span>
      <input
        type="range"
        min="0"
        :max="chapters.length - 1"
        v-model.number="current"
        @input="onSlide"
      />
      <span class="page-indicator">{{ current + 1 }} / {{ chapters.length }}</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      current: 0,
      vertical: true,
      isDark: true,
    }
  },
  computed: {
    topLinks() {
      return (this.$themeConfig && this.$themeConfig.topLinks) || []
    },
    chapters() {
      return (this.$themeConfig && this.$themeConfig.chapters) || []
    },
    modeLabel() {
      return this.vertical ? '横' : '竖'
    },
  },
  watch: {
    '$route.path'() {
      this.syncCurrent()
    },
  },
  mounted() {
    this.syncCurrent()

    // 鼠标滚轮：横向滚动（适配竖排文字）
    const body = this.$refs.body
    if (body) {
      body.addEventListener('wheel', this.onWheel, { passive: false })
    }

    // 键盘左右箭头翻页
    window.addEventListener('keydown', this.onKey)
  },
  beforeDestroy() {
    const body = this.$refs.body
    if (body) {
      body.removeEventListener('wheel', this.onWheel)
    }
    window.removeEventListener('keydown', this.onKey)
  },
  methods: {
    syncCurrent() {
      const path = this.$route.path
      const idx = this.chapters.findIndex(c => c.path === path)
      if (idx >= 0) {
        this.current = idx
      }
    },
    goTo(i) {
      const chap = this.chapters[i]
      if (chap && chap.path) {
        this.$router.push(chap.path)
      }
    },
    onSlide() {
      this.goTo(this.current)
    },
    onWheel(e) {
      const body = this.$refs.body
      if (!body) return
      // 竖排时上下滚动映射为左右滚动
      if (this.vertical) {
        e.preventDefault()
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          body.scrollLeft += e.deltaY
        } else {
          body.scrollLeft += e.deltaX
        }
      } else {
        // 横排时正常上下滚
        body.scrollTop += e.deltaY
      }
    },
    onKey(e) {
      // 顶 tab 章节间快速跳转
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (this.current > 0) this.goTo(this.current - 1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (this.current < this.chapters.length - 1) this.goTo(this.current + 1)
      } else if (e.key === 'v' || e.key === 'V') {
        this.vertical = !this.vertical
      }
    },
    toggleMode() {
      this.vertical = !this.vertical
    },
  },
}
</script>

<style lang="scss">
// 样式由全局 styles/index.scss 接管，这里只放局部微调
.yinfu-root {
  width: 100%;
  height: 100%;
}
.yinfu-scroll {
  min-height: 100%;
}
</style>