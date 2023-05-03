export async function getTitlePage(title: string, description: string) {
    return { title: `${title}`, description: `${description}` };
}