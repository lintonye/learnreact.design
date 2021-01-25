import { useEffect, useState } from 'react'

export function useImportTipVideoPaths(
  dirname: string,
  video: string,
  videoPoster: string,
) {
  const [videoPath, setVideoPath] = useState<string>()
  const [videoPosterPath, setVideoPosterPath] = useState<string>()

  useEffect(() => {
    Promise.all([
      video ? import(`@/pages/tips/${dirname}/${video}`) : null,
      videoPoster ? import(`@/pages/tips/${dirname}/${videoPoster}`) : null,
    ]).then(([vp, vpp]) => {
      vp && setVideoPath(vp.default)
      vpp && setVideoPosterPath(vpp.default)
    })
  }, [dirname, video])
  return [videoPath, videoPosterPath]
}
