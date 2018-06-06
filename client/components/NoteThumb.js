import React from 'react'
// import {connect} from 'react-redux'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

/**
 * COMPONENT
 */
export const NoteThumb = (props) => {
  const { note, shares } = props
  function handleDelete() {
    alert('You clicked the delete icon.'); // eslint-disable-line no-alert
  }

  function handleClick() {
    alert('You clicked the Chip.'); // eslint-disable-line no-alert
  }

  return (
      <Card style={{minWidth: 275, maxWidth: 100, marginBottom: 10, marginRight: 10}} className="card" key={ note.id }>
          <CardContent>
            <Typography
                style={{marginBottom: 16,
                fontSize: 14}}className="title" color="textSecondary">
              {note.content}
            </Typography>
            <Typography variant="headline" component="h2">
              HELLO
            </Typography>
            <Typography style={{marginBottom: 12}}className="pos" color="textSecondary">
              adjective
            </Typography>
            <Typography component="p">
              well meaning and kindly.<br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
          {<Chip
        avatar={
          <Avatar>
            <FaceIcon />
          </Avatar>
        }
        label="Clickable Deletable Chip"
        onClick={handleClick}
        onDelete={handleDelete}
        className="chip"
      />}
      </Card>
  )
}

// /**
//  * CONTAINER
// //  */
// const mapState = (shares) => (shares)


// export default connect(mapState)(NoteThumb)
