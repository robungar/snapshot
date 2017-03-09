import React, { Component } from 'react'
import { Register } from '../view'
import { connect } from 'react-redux'
import actions from '../../actions'

class Account extends Component {

	componentDidMount(){
		this.props.checkCurrentUser()
	}

	register(registration){
		this.props.signup(registration)
	}

	login(credentials){
		this.props.login(credentials)
	}

	logout(){
		this.props.logout()
	}

	render(){
		const currentUser = this.props.account.user

		return (
			<div>
				{ 
					(currentUser == null) ? <Register onRegister={this.register.bind(this)} onLogin={this.login.bind(this)} /> : (
							<div>
							<h2>{currentUser.username}</h2> 
							<button className="button special small" onClick={this.logout.bind(this)}>Log Out</button>
							</div>
						)
				}
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		account: state.account
	}
}

const dispatchToProps = (dispatch) => {
	return {
		signup: (params) => dispatch(actions.signup(params)),
		login: (params) => dispatch(actions.login(params)),
		checkCurrentUser: () => dispatch(actions.checkCurrentUser()),
		logout: () => dispatch(actions.logout())
	}
}


export default connect(stateToProps, dispatchToProps)(Account)


