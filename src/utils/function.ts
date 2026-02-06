export function lowercase(text: any): string {
  try {
    return text?.toString().toLowerCase() ?? ''
  } catch (error) {
    console.error('Error converting text to lowercase:', error)

    return text
  }
}