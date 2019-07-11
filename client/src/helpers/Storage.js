export const SetIntoStorage = async (data, key, type) => {
    switch (type) {
        case 'session':
            await sessionStorage.setItem(key, JSON.stringify(data));
            break;
    
        case 'local':
            await localStorage.setItem(key, JSON.stringify(data));
            break;

        default:
            break;
    }
}