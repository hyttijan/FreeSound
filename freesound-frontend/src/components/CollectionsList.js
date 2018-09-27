import React from 'react'
import AudioList from './AudioList'
import { connect } from 'react-redux'
import {Table} from 'semantic-ui-react'
import {initAllCollectionInGenreAction} from '../reducers/CollectionReducer'
class CollectionsList extends React.Component{

		componentDidMount(){
			this.props.initAllCollectionInGenreAction(this.props.genreId)
		}
		componentDidUpdate(prevProps){
			if(prevProps.genreId!==this.props.genreId){
				this.props.initAllCollectionInGenreAction(this.props.genreId)
			}
		}
		render(){
			if(this.props.collections===[]){
				return null
			}
			const collections = this.props.collections.map((collection)=>{
				return(
					<AudioList key={collection.id} collection={collection}/>
				)
			})
			return(
				<Table celled selectable inverted>
  					<Table.Header>
    					<Table.Row>
      						<Table.HeaderCell><h3>Name</h3></Table.HeaderCell>
      						<Table.HeaderCell>Creator</Table.HeaderCell>
      						<Table.HeaderCell textAlign="right">Amount</Table.HeaderCell>
    					</Table.Row>
  					</Table.Header>
    				{collections}
  				</Table>
  			)
		}

}
const mapStateToProps = (state)=>{
	return {
		collections: state.collections
	}
}
const mapDispatchToProps = {
	initAllCollectionInGenreAction
}
const ConnectedCollectionsList= connect(mapStateToProps,mapDispatchToProps)(CollectionsList)
export default ConnectedCollectionsList