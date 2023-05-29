import { useEffect } from 'react'

export function ChattieChatBubbleEmbed({ id }: { id: string }) {
  // add the script to the page
  useEffect(() => {
    // @ts-ignore
    window.chattieConfig = {
      chattieId: id,
      closeButton: true,
    }
    // widget script
    const script = document.createElement('script')
    script.src =
      'https://chattie-app-git-jimu-24-research-how-to-create-e9378e-lintonye.vercel.app/js/embed.js'
    script.async = true
    script.defer = true
    script.id = id
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])
  return null
}
