import React,{useState,useEffect} from "react";
import Card from "./card";
import { Container, Grid,Form,Button, Header,Dropdown,Modal } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { updatecourse, addexpense ,addcategory,getexpenses,getcategories} from "../actions/courseactions";
import { clearmessage } from '../actions/messages'
import { useDispatch } from "react-redux";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';



export default function Content() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.Course.courses);
  const token = useSelector((state) => state.loginstate.token);
  const categories = useSelector((state) => state.Categories.categories);
  const [addExpenseform, setAddExpenseform] = useState(false)
  const [addCategory, setAddCategory] = useState(false)
  const [filteredList, setFilteredList] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    description: "",
    name:'',
  
  })

  const message = useSelector((state) => state.Message);


  useEffect(() => {
    
      if(message) {
        setOpenModal(true)
        setTimeout(setOpenModal,2000,false)
        setTimeout(dispatch,2000,clearmessage())
        
      }
     
    
  }, [message]);
  

  const [currentDateStart, setNewStartDate] = useState(new Date(new Date()-2.592e+9));
  const onChangeStart = (event, data) => {setNewStartDate(data.value); setFilteredList(expenses.filter((e)=>(data.value<=new Date(e.date_added)&&(currentDateEnd.getTime()+8.64e+7)>=new Date(e.date_added).getTime())))}

  const [currentDateEnd, setNewEndDate] = useState(new Date());
  const onChangeEnd = (event, data) => {setNewEndDate(data.value); setFilteredList(expenses.filter((e)=>(currentDateStart<=new Date(e.date_added)&&(data.value.getTime()+8.64e+7)>=new Date(e.date_added).getTime())))}


  useEffect(() => {
    setFilteredList(expenses.filter((e)=>(currentDateStart<=new Date(e.date_added)&&(currentDateEnd.getTime()+8.64e+7)>=(new Date(e.date_added)).getTime())))
    
    
    
  }, [expenses])

  
  useEffect(() => {
    if (token){
    dispatch(getexpenses())
    dispatch(getcategories())
    }
  }, [token])



const handlesubmit_expense=(e)=>{
  const {category,amount,description}=formData
  if(category===''||amount==='' || description===''){
    alert('Please enter/select all the details')
    return null
  }
  const body = JSON.stringify(formData);
  dispatch(addexpense(body))
  setFormData({
    category: "",
    amount: "",
    description: "",
    name:'',
  
  })
}

const handlesubmit_category=(e)=>{
  const body = JSON.stringify(formData);
  if(formData.name===''){
    alert('Please the category')
    return null
  }
  dispatch(addcategory(body))
  setFormData({
    category: "",
    amount: "",
    description: "",
    name:'',
  
  })
}


const onchange = (e, { name, value }) => {
  setFormData((prevstate) => {
    return { ...prevstate, [name]: value };
  });
};




  return (
    
    <div className="content">
      <Button onClick={()=>setAddExpenseform(!addExpenseform)}>Add new expense</Button>
      <Button onClick={()=>setAddCategory(!addCategory)}>Add new category</Button>
      {addExpenseform&&<Form style={{marginTop:20}}>
        <Dropdown
    placeholder='Select category'
    fluid
    selection
    options={categories?categories.map((c)=>({key:c,text:c,value:c})):null}
    value={formData.category}
    onChange={(e,{value})=>onchange(e,{name:'category',value})}
  />
    <Form.Group widths='equal'>
    
      <Form.Input
      fluid
      
      label='Amount'
      placeholder=''
      name='amount'
      value={formData.amount}
      onChange={onchange}
    /><Form.Input
    fluid
    
    label='Desription'
    placeholder=''
    name='description'
    value={formData.description}
    onChange={onchange}
  />
      
    </Form.Group>
    <Form.Button onClick={handlesubmit_expense}>add expense</Form.Button>
  </Form>}

  {addCategory&&<Form style={{marginTop:20}}>
    <Form.Group widths='equal'>
      <Form.Input
        fluid
        id='form-subcomponent-shorthand-input-first-name'
        label='Category'
        placeholder=''
        name='name'
        value={formData.name}
        onChange={onchange}
      />
      
    </Form.Group>
    <Form.Button onClick={handlesubmit_category}>add category</Form.Button>
  </Form>}
<Header>Expenses</Header>

<p>filter:</p>

<Grid  divided>
    <Grid.Row>
      <Grid.Column>
      start date:
      </Grid.Column>
      <Grid.Column>
      <SemanticDatepicker onChange={onChangeStart} />
      </Grid.Column>
      
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
      end date:
      </Grid.Column>
      <Grid.Column floated='left'>
      <SemanticDatepicker onChange={onChangeEnd} />
      </Grid.Column>
      
    </Grid.Row>
  </Grid>

 
      
      <Grid >
        {filteredList.map((e,i)=> (
          <Grid.Column key={i}  mobile={16} tablet={8} computer={4}>
            <Card
              amount={e.amount}
              category={e.category}
              desc={e.description}
              time={e.date_added}
              key={e.i}
              index={i}
              
            />
          </Grid.Column>
        ))}
      </Grid>
      <Modal
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
      open={openModal}
      size='mini'
      header={message}
      dimmer={false}
      
    />
    </div>
  );
}
