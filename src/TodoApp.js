import React, { Fragment, useEffect, useState } from "react";
// import "./styles.scss";
import styled from "styled-components";
const Button = styled.button`
padding:10px 12px;
color: #2c90b8;
font-size: 12px;
border: 1px solid #2c90b8;
border-radius: 3px;
background:white;
margin-right:20px;
&:hover {
  color: white;
  background:#2c90b8;
}
${({ disabled }) => handleDisabledButton(disabled)};

${({ buttonPosition }) => handleButtonPosition(buttonPosition)};
`;

const handleDisabledButton = disabled => {
  switch (disabled) {
    case true:
      return "pointer-events:none;color: #c0c0c0;border:1px solid #c0c0c0;background-color: #ffffff;cursor: not-allowed";
    default:
      return "position: relative; ";
  }
}
const handleButtonPosition = buttonPosition => {
  switch (buttonPosition) {
    case "absolute":
      return "position: absolute; background: white;right:20px";
    default:
      return "position: relative; ";
  }
};
const Title = styled.h1`
font-size: 24px;
color: #503e35;
`;

const Form = styled.form`
font-size: 24px;
margin-bottom:20px
`;


const UnorderedLiElement = styled.li`
font-size: 14px;
color: #999;
border: 1px solid #6f6b6c;
padding:20px;
margin:30px;
position:relative;
display:flex;
align-items:center
`;
const InputCheckbox = styled.input.attrs({ type: "checkbox" })``;

const Wrapper = styled.div`
padding:20px;
text-align:center;

`;

const InputText = styled.input.attrs({ type: "Text" })`
padding: 9px 10px;
border: 1px solid #979393;
margin-right:20px;
`;

const Label = styled.label`
  align-items: center;
`

const LabelText = styled.span`
color: #000;
margin-left: 10px;
${InputCheckbox}:checked + && {
  text-decoration:line-through;
}
`;
function TodoApp() {
  const [multiDisable, setMultiDisable] = useState(true)
  const [intialValues, setIntialValues] = useState({
    items: [],
    text: ""
  });
  const handleTextChange = (event) => {
    setIntialValues({ ...intialValues, text: event.target.value });
  };
  const handleAddItem = (event) => {
    event.preventDefault();
    var newItem = {
      id: Date.now(),
      text: intialValues.text,
      done: false
    };
    var checkItemExist = [];
    if (intialValues.items.length > 0) {
      checkItemExist = intialValues.items.filter((item) => {
        return item.text === newItem.text;
      });
    }
    setIntialValues((prevValues) => {
      return {
        ...prevValues,
        items: prevValues.items.concat(newItem),
        text: ""
      };
    });
    enableMultiButton();
  };
  const markItemCompleted = (itemId) => {
    var updatedItems = intialValues.items.map((item) => {
      if (itemId === item.id) item.done = !item.done;

      console.log("intialValues", intialValues);
      enableMultiButton(updatedItems);
      return item;
    });
    setIntialValues({ ...intialValues, items: [].concat(updatedItems) });
  };
  const handleDeleteItem = (itemId) => {
    var updatedItems = intialValues.items.filter((item) => {
      return item.id !== itemId;
    });
    setIntialValues({ ...intialValues, items: [].concat(updatedItems) });
    enableMultiButton(updatedItems);
  };

  const enableMultiButton = (updatedItems) => {
    var data = updatedItems ? updatedItems : intialValues.items;
    var finsihedTask = data.filter((item) => item.done == true);
    finsihedTask.length > 0 ? setMultiDisable(false) : setMultiDisable(true);
  }

  const DeleteSelectedTask = () => {
    var finsihedTask = intialValues.items.filter((item) => item.done !== true);
    setIntialValues({ ...intialValues, items: [].concat(finsihedTask) });
    setMultiDisable(true)
  }
  const SortByTaskName = () => {
    var sortedData = intialValues.items.sort((a, b) => (a > b) ? 1 : -1)
    setIntialValues({ ...intialValues, items: sortedData });
  }
  const handleEditItem = () => {
    console.log("sas");
    // setEnableEditItem(!enableEditItem)
  }
  const updateEdiatedValue = (inputtest, id) => {
    console.log(inputtest, id)
    var index = intialValues.items.findIndex(x => x.id === id);
    intialValues.items[index].text = inputtest;
    setIntialValues(intialValues);
  }
  return (
    <Wrapper>

      <Title>TO DO LIST</Title>
      <Form>
        <InputText
          onChange={(e) => handleTextChange(e)}
          value={intialValues.text}
        />
        <Button position="relative"
          onClick={e => handleAddItem(e)}
          disabled={!intialValues.text}
        >
          {"Add #" + (intialValues.items.length + 1)}
        </Button>
      </Form>
      {intialValues.items.length == 0 &&
        <Wrapper>
          <p>Please Add todo task</p>
        </Wrapper>
      }
      {intialValues.items.length > 0 &&
        <Fragment>
          <Button position="relative"
            disabled={multiDisable}
            onClick={DeleteSelectedTask}
          >
            Delete All
          </Button>
          <Button position="relative"
            onClick={SortByTaskName}
          >
            Sort By Task Name
          </Button>
          <TodoList
            items={intialValues.items}
            onItemCompleted={(e) => markItemCompleted(e)}
            onDeleteItem={(e) => handleDeleteItem(e)}
            onEditItem={(e) => handleEditItem(e)}
            multiDisable={multiDisable}
            deleteSelectedTask={DeleteSelectedTask}
            updateEdiatedValue={updateEdiatedValue}
          />
        </Fragment>
      }
    </Wrapper>
  );
}
function TodoItem(props) {
  // this._listItem =  null;
  const [listItem, setListItem] = useState("highlight");
  const [tickMark, setTickMark] = useState(false)
  const [editNameFlag, setEditNameFlag] = useState(true)
  const [inputText, setInputText] = useState(props.text)
  const markCompleted = (event) => {
    setTickMark(!tickMark);
    event.target.checked = true;
    props.onItemCompleted(props.id);
  };

  const deleteItem = (event) => {
    props.onDeleteItem(props.id);
  };
  const editName = () => {
    setEditNameFlag(!editNameFlag)
    props.onEditItem(props.id);
  }
  const handleOnInputChange = (e) => {
    console.log(e.target.value)
    setInputText(e.target.value)
  }
  const handleTextChange = (textchange, e) => {
    console.log(textchange)
    setEditNameFlag(true)
    if (textchange) {
      props.updateEdiatedValue(inputText, props.id)
    }

  }
  // Highlight newly added item for several seconds.
  useEffect(() => {
    // setListItem("highlight")
    setTimeout(
      () => {
        // 3. Remove highlight class.
        setListItem("")
      },
      1500,
    );
  }, []);


  return (

    <Fragment >
      <UnorderedLiElement
        highlight={listItem}
      >

        <Label >
          <InputCheckbox
            checked={tickMark}
            onChange={e => markCompleted(e)}
          />
          {editNameFlag ? <LabelText  >{inputText}</LabelText> :
            <Fragment>
              <InputText
                onChange={e => handleOnInputChange(e)}
                value={inputText}
              ></InputText>
              <Button onClick={e => handleTextChange(false, e)} buttonPosition="relative" >cancel
              </Button>
              <Button onClick={e => handleTextChange(true, e)} buttonPosition="relative" >Save
              </Button>
            </Fragment>

          }


        </Label>
        <Button onClick={(e) => editName(e)} buttonPosition="absolute" disabled={!editNameFlag} style={{ right: "80px" }} >Edit
        </Button>
        <Button onClick={(e) => deleteItem(e)} buttonPosition="absolute" >X
        </Button>

      </UnorderedLiElement>
    </Fragment>


  );
}

function TodoList(props) {
  console.log("TodoList", props);
  const UnOrderedList = styled.ul`
  font-size: 14px;
  color: #000;
  border: 1px solid #6f6b6c;
  list-style: none;
  padding-left:0px;
`;
  return (
    <Fragment>
      <UnOrderedList >
        {props?.items?.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            text={item.text}
            completed={item.done}
            onItemCompleted={props.onItemCompleted}
            onDeleteItem={props.onDeleteItem}
            onEditItem={props.onEditItem}
            updateEdiatedValue={props.updateEdiatedValue}
          />
        ))}
      </UnOrderedList>
    </Fragment>
  );
}

export default TodoApp;
