import React,{useState} from "react";
import { useBooks } from "./BookContext";
export default()=>{

    const [isbn,setIsbn]=useState();
    const [name,setName]=useState();
    const [category,setCategory]=useState();
    const [row,setRow]=useState();

    const [count,setCount]=useState();
    const [cost,setCost]=useState();

    const [availability,setAvailability]=useState();
    const [errorMessage, setErrorMessage] = useState("");

    const {books,addBook}=useBooks();
    const [showAlert, setShowAlert] = useState(false);
   const  submit=async(e)=>{
        e.preventDefault()
        // console.log(e)
        const isIsbnExist = books.some((book) => book.isbn === isbn);
        if (isIsbnExist) {
            setErrorMessage("ISBN already exists!");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                setErrorMessage("");
            }, 3000);
            return;
        }

        addBook({isbn,name,category,row,count,cost,availability})
        setErrorMessage("Book Added");
        setShowAlert(true);
        // console.log(books)

        
        setTimeout(() => {
          
            setShowAlert(false);
            setErrorMessage("");
        }, 3000);

    }

    return(<div className="container pt-5">
    <form onSubmit={submit} className="">

        <div className="mb-3">
        <label for="isbn" className="form-label">{isbn}
            ISBN
        </label>
    <input className="form-control" id="isbn" onChange={(e)=>setIsbn(e.target.value)}/>

        </div>

        <div className="mb-3">
        <label for="name" className="form-label">{name}
            Name
        </label>
    <input className="form-control" id="name" onChange={e=>setName(e.target.value)}/>

        </div>
       
        <div className="mb-3">
        <label for="category" className="form-label">{category}
            Category
        </label>
    <input className="form-control" id="category" onChange={e=>setCategory(e.target.value)}/>

        </div>   

        <div className="mb-3">
        <label for="row" className="form-label">{row}
            Row No.
        </label>
    <input className="form-control" id="row" onChange={e=>{setRow(e.target.value)}}/>

        </div>

        <div className="mb-3">
        <label className="form-label" for="count">{count}
            Book Count
        </label>
    <input className="form-control" id="count" onChange={e=>{setCount(e.target.value)}}/>

        </div>   

    <div className="mb-3" >
        <label className="form-label" for="cost">{cost}
            Cost
        </label>
    <input className="form-control" id="cost" onChange={e=>{setCost(e.target.value)}}/>

        </div>    

    <div className="mb-3">
        <label className="form-label" for="availability"> {availability}
            Availability
        </label>
    <input className="form-control" id="availability" onChange={e=>setAvailability(e.target.value)}/>

        </div>     
        <button className="btn btn-primary">Add</button>
        {showAlert && (
                    <div className="alert alert-success mt-3" role="alert">
                       {errorMessage}
                    </div>
                )}
    </form>

    </div>)
}