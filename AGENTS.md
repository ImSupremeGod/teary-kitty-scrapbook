<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Birthday site: all personal text and the gift catalogue live in src/lib/birthday-config.ts; lottery pool is derived from lotteryEligible in src/lib/lottery.ts (tested) so content edits never touch logic.
- Validate session progress through src/lib/birthday-progress.ts before rendering; malformed or stale progress must restart safely rather than leave a blank or unwinnable scene.
- Keep scratch completion in lottery progress and retain sound preferences on replay; replay restarts the song without losing the recipient's audio choices.
