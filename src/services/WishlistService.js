import Api from '@/services/Api'

export default{
    request(){
        return Api().get('/api/wishlist');
    },
    update(entry){
        return Api().patch('/api/wishlist', entry);
    }
}

