import { Widget } from "@uploadcare/react-widget";
export const FormUpload = (props: {value?: string; onChange: (value: string | null) => void}) => {
  const { value, onChange} = props;
  return <Widget value={value} publicKey={'d3a7a1a8e152e7082dda'} onChange={(info) => {
    onChange(info.cdnUrl)
  }} />
}