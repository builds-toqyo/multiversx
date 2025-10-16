import { Heart } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="mx-auto w-full max-w-prose pb-6 px-6 text-center text-gray-400">
      <div className="flex flex-col items-center text-sm">
        <a
          className="text-gray-400 hover:cursor-pointer hover:underline mb-2"
          href="https://github.com/multiversx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Disclaimer
        </a>
        <a
          target="_blank"
          className="flex items-center hover:underline"
          href="https://multiversx.com/"
          rel="noopener noreferrer"
        >
          Made with <Heart className="mx-1 w-4 h-4 fill-gray-400" /> by the MultiversX team
        </a>
        <span className="text-xs text-gray-400 mt-2">
          Development Build - Not for production use
        </span>
      </div>
    </footer>
  )
}
