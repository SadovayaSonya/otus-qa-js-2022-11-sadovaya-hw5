export default function randomName(length) {
    let name = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        name += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return name;
}