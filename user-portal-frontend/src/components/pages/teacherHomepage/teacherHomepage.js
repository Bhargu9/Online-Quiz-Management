import React from "react";
import { connect } from "react-redux";
import LogoutButton from "../../atoms/LogoutButton/LogoutButton";
import Auth from "../../../helper/Auth";
import { Navigate } from "react-router-dom";
import { getUserDetails} from "../../../redux/actions/loginAction";
import AddQuestionForm from "../../templates/AddQuestionForm/AddQuestionForm";
import AlertBox from '../../atoms/Alertbox/AlertBox';
import { Drawer, Typography, withStyles, AppBar, Toolbar, List, ListItem, ListItemText } from "@material-ui/core";
import QuestionDetails from "../../templates/QuestionDetails/questionDetails";
import CreateTestForm from "../../templates/CreateTestForm/CreateTestForm";
import TestDetails from "../../templates/TestDetails/TestDetails";
import'./tH.css'

const drawerWidth = 200
const appbarHeight = 64

const useStyles = (theme)=>({
  drawer : {
    width : drawerWidth,
    height : `calc(100% - ${appbarHeight}px)`,
    top : appbarHeight
  },
  drawerPaper : {
    width : drawerWidth,
    height : `calc(100% - ${appbarHeight}px)`,
    top : appbarHeight
  },
  flex : {
    display : 'flex'
  },
  content : {
    margin:'auto'
  },
  addHeight : theme.mixins.toolbar,
  title : {
    flexGrow : 1
  },
  appbar : {
    height : appbarHeight
  }
})

class TeacherHomepage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      content:(
        <div id="content">
          <div id="image">.</div>
          <div id="yo"><p>Welcome back, teacher! </p><p>Empower your students with our versatile online exam platform.</p><p>Let's make learning fun and effective together!</p></div>
        </div>), 
      menuList : [
      {
        title: 'Add Question',
        content:<AddQuestionForm/>
      },{
        title: 'Questions',
        content:<QuestionDetails/>
      },{
        title: 'Create Test',
        content: <CreateTestForm/>
      },{
        title : 'View Tests',
        content : <TestDetails/>
      }]
    }
  }

  onMenuItemClick(content) {
    this.setState({
      ...this.state,
      content: content
    })
  }

  render(){
    if(!Auth.retriveToken() || Auth.retriveToken()==='undefined'){
      return (<Navigate to='/'/>);
    } else if(!this.props.user.isLoggedIn) {
      this.props.getUserDetails();
      return (<div></div>);
    } else if(this.props.user.userDetails.type !== 'TEACHER') {
      return (<Navigate to='/'/>);
    }
    return(
      <div>
        <div>
          <AppBar
            elevation={0}
            className={this.props.classes.appbar}
          >
            <Toolbar>
                  <Typography variant='h5' className={this.props.classes.title}>
                    Teacher Homepage
                  </Typography>
                  <Typography variant='h6'>
                    Welcome, {this.props.user.userDetails.username} !!
                  </Typography>
            </Toolbar>
          </AppBar>
          <div className={this.props.classes.addHeight}></div>
        </div>
        <div className={this.props.classes.flex}>
          <Drawer
            className={this.props.classes.drawer}
            variant="permanent"
            anchor="left"
            classes= { {paper:this.props.classes.drawerPaper}}
          >
            <List>
              {this.state.menuList.map((item,index)=>(
                <ListItem button key={index} onClick={()=>(this.onMenuItemClick(item.content))}>
                  <ListItemText primary={item.title}/>
                </ListItem>
              ))}
              <ListItem>
              <LogoutButton/>
              </ListItem>
            </List>
          </Drawer>
          <div className={this.props.classes.content}>
            
            <AlertBox></AlertBox>
            {this.state.content}
            
          </div>
        </div>
        
        
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  user:state.user
})

export default withStyles(useStyles) (connect(mapStatetoProps,{
  getUserDetails
})(TeacherHomepage));