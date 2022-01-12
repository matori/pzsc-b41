<script lang="ts">
import SVGSprite from './SVGSprite.svelte';
import Header from './Header.svelte';
import Main from './Main.svelte';
import Footer from './Footer.svelte';
</script>

<SVGSprite/>
<div class="Content">
  <Header/>
  <Main/>
  <Footer/>
</div>

<style lang="scss">
@use "sass:math" as *;
@use "../scss/functions" as *;

.Content {
  margin-inline: auto;
  padding-inline: get-lines(1);
  max-width: #{(rem(400px * 3) + get-lines(6))};
}
</style>
