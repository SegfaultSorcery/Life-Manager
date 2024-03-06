import Api from '@/services/Api'

export default{
    request(){
        return Api().post('wishlist');
    }
}

