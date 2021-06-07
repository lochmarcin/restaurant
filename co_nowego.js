# 1
// Pokazywanie tylko stolików dostępnych na daną date i restaurację 
// axios.delete !
// id_rest - id restauracji 
localhost:5000/table/getByDate
{
    "id_rest":1,
    "year":"2021",
    "month":"06",
    "day":"30"
}
// response.data.data. id, id_rest, numb_seats, number_table, image_url


# 2
// usuwanie rezerwacji 
// axios.delete !
// W parametrze przesyłasz id rezerwacji - id_reserwation
localhost:5000/reserwation/delete :parametr

#3
// Pobieranie informacji o restauracji 
// axios.get
// W papametrze idrestauracji 
localhost:5000/restaurant/getInfo/:id_rest
// Zwracam : name, description, category, phone, city, street, apart_number

#4
