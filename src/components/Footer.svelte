<footer class="Footer">
  <dl class="Footer-list">
    <div>
      <dt class="Footer-heading">References</dt>
      <dd class="Footer-body">
        <ul class="Footer-links">
          <li><a href="https://pzwiki.net/wiki/Skill_Books">Skill Books - PZwiki</a></li>
          <li><a href="https://pzwiki.net/wiki/Recipe_Magazines">Recipe Magazines - PZwiki</a></li>
          <li><a href="https://pzwiki.net/wiki/VHS">VHS - PZwiki</a></li>
        </ul>
      </dd>
    </div>
    <div>
      <dt class="Footer-heading">Web page source</dt>
      <dd class="Footer-body">
        <a href="https://github.com/matori/pzsc-b41">GitHub repository</a>
      </dd>
    </div>
    <div>
      <dt class="Footer-heading">Author</dt>
      <dd class="Footer-body">
        Twitter: <a href="https://twitter.com/ub_pnr">@ub_pnr</a>
      </dd>
    </div>
  </dl>
</footer>

<style lang="scss">
@use "../scss/functions" as *;
@use "../scss/mixins" as *;

.Footer {
  border-block-start: 1px solid var(--color-border-thin);
  padding-block: get-lines(1, 5);
}

.Footer-list {
  display: flex;
  flex-direction: column;
  row-gap: get-lines(0.5);
  margin: 0;
}

.Footer-body {
  margin-left: get-lines(2);
}

.Footer-links {
  margin: 0;
  padding-left: 0;
}
</style>
