type Props = {} & React.InputHTMLAttributes<HTMLInputElement>

export function Radio({ className, ...props }: Props) {
  return <input type="radio" className={' ' + className} {...props} />
}
