export async function apiPredict(file: File) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/predict`
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error('Predict request failed')
  }

  return res.json()
}