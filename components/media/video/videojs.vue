<template>
  <div>
    <video id="m-player" ref="videoPlayer" class="video-js" controls preload="auto" data-setup='{}' :options="videoOptions">
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank">
          supports HTML5 video
        </a>
      </p>
    </video>
  </div>
</template>

<script>
  import videojs from 'video.js';

  export default {
    name: 'VideoPlayer',
    props: {
      options: {
        type: Object,
        default () {
          return {};
        }
      }
    },
    data() {
      return {
        player: null,
        videoOptions: {
          autoplay: true,
          controls: true,
        }
      }
    },
    mounted() {
      this.player = videojs(this.$refs.videoPlayer, this.options, () => {
        this.player.log('onPlayerReady', this);
      });
    },
    beforeDestroy() {
      if (this.player) {
        this.player.dispose();
      }
    }
  }
</script>