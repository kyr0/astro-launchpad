import { signIn, getAuthState} from "@packages/auth";
import { t } from "@packages/i18n";
import { GithubIcon } from "@packages/icons";
import { useSignal, effect } from "@preact/signals";
import { useRef } from "preact/hooks";

export const SocialSignIn = () => {

    const isLoggedIn = useSignal(false)
    const githubLoginButton = useRef<HTMLButtonElement>()

    effect(async() => {
        const authResult = await getAuthState()
        isLoggedIn.value = authResult.isLoggedIn
    })

    const onLoginGithubClick = async() => {
      githubLoginButton.current.classList.add("loading", "btn-disabled")
      await signIn("github")
    }

    return <>
      {!isLoggedIn.value && <>
        <button ref={githubLoginButton} 
          class="btn btn-primary gap-2" onClick={onLoginGithubClick}>
          <GithubIcon /> GitHub
        </button>
      </>}

      {isLoggedIn.value && <p>{t('common.auth.already_logged_in')}</p>}
    </>
}
