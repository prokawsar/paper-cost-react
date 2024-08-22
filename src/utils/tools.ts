export function makeid(length: number) {
  let str = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    str += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return str;
}

export const sortedByCreatedAt = (data: any) => {
  return data.sort((a: any, b: any) => {
    // Convert 'created_at' strings to Date objects
    let dateA = new Date(a.created_at);
    let dateB = new Date(b.created_at);

    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });
};
