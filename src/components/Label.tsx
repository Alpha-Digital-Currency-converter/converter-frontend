interface LabelProps {
  focus?: boolean
  title:string
  for:string
}

export function Label(props: LabelProps){
    return(
        <label
        className={`label ${props.focus ? "focused" : ""}`}
        htmlFor={props.for}
      >
        {props.title}
      </label>
    )
}
