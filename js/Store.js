//import { useAsyncStorage } from '@react-native-community/async-storage';

const ITEMS_KEY = 'MYJOURNAL_ITEMS';

//const { getItem, setItem, removeItem } = useAsyncStorage(ITEMS_KEY);


export default class Store {

    static loadItems = async () => {
        let items = null;
        try {
  //          const jsonItems = await getItem();
  //          items = JSON.parse(jsonItems);
        } catch (error) {
            console.error('Error loading journal items.', error.message);
        }
        return items || [];
    };

    static saveItems = async items => {
        try {
    //        await setItem(JSON.stringify(items));
        } catch (error) {
            console.error('Error saving journal items.', error.message);
        }
    };

    static deleteItems = async () => {
        try {
      //      await removeItem();
        } catch (error) {
            console.error('Error deleting journal items.', error.message);
        }
    };

}