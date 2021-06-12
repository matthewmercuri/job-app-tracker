export default function JobTableItem ({ data }) {
  return (
    <>
      <p>{JSON.stringify(data, null, 2)}</p>
    </>
  )
}
