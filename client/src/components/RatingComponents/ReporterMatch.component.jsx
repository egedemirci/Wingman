import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { UsersContext } from "../../context/UserContex";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import SmallCard from "../SmallCard";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import CardReasonsCard from "./CardReasonCard.component";
import RedYellowCardCard from "./RedYellowCardCard.component";
import FoulCard from "./FoulCard.component";
import HoverRating from "./Rating.component";
import SendIcon from "@mui/icons-material/Send";
import UserFinder from "../../apis/UserFinder.js";

let timeline = [];

const labels = {
  1: 'Very poor',
  2: 'Very poor+',
  3: 'Poor',
  4: 'Poor+',
  5: 'Ok',
  6: 'Ok+',
  7: 'Good',
  8: 'Good+',
  9: 'Excellent',
  10: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


function createTimelineItem(text, eventSide, matchTime, eventType) {
  let homeText;
  let awayText;
  if (eventSide == "Home") {
    homeText = text;
    awayText = "";
  } else {
    homeText = "";
    awayText = text;
  }
  let eventIconSrc = getIconSrcFromType(eventType);
  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ py: "12px", px: 2 }}>
        <Typography variant="h6" component="span"></Typography>
        <Typography sx={{ mt: 2 }}>{homeText}</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot>
          <Avatar
            alt="Yellow Card"
            src={eventIconSrc}
            sx={{ width: 40, height: 40 }}
          />
        </TimelineDot>
        <Typography style={{ fontSize: 15 }} color="text.secondary">
          {matchTime}'
        </Typography>
        <Typography
          style={{ fontSize: 10, fontWeight: "bold" }}
          color="text.secondary"
        >
          |
        </Typography>
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Typography variant="h6" component="span"></Typography>
        <Typography sx={{ mt: 2 }}>{awayText}</Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

function getIconSrcFromType(eventType) {
  if (eventType == "Yellow Card") {
    return "https://cdn-icons-png.flaticon.com/512/942/942046.png";
  } else if (eventType == "Red Card") {
    return "https://cdn1.iconfinder.com/data/icons/soccer-flat-color/64/Soccer_Flat_Color_soccer_football_sports_punish_card-512.png";
  } else if (eventType == "Change") {
    return "https://cdn1.iconfinder.com/data/icons/soccer-flat-color/64/Soccer_Flat_Color_soccer_football_sports_transfer_player-512.png";
  } else if (eventType == "Goal") {
    return "https://cdn.icon-icons.com/icons2/716/PNG/512/Goal_icon-icons.com_62267.png";
  }
}

export default function ReporterMatch() {
  const [matchData, setMatchData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isAvalible, setAvalible] = useState(true);
  const [hasRated, setRated] = useState(false);
  const {user} = useContext(UsersContext)
  const [value, setValue] = React.useState(5);
  const [hover, setHover] = React.useState(5);


  const navigate = useNavigate();

  let id;

  const fetcData = async () => {
    try {
      const response = await UserFinder.get(`/match/${id}`);
      setMatchData(response.data.data);
      timeline = (response.data.timeline);
      setLoading(false);
    } catch (err) {
      setAvalible(false);
    }
  };

  function renderRate(){
    if(user.role == "TFF Admin")
    {
      return(<CardContent><Box display="flex"
      justifyContent="center"
      alignItems="center">Admins can't rate.</Box></CardContent>)
    }
    else if(hasRated)
    {
      return(<CardContent><Box display="flex"
      justifyContent="center"
      alignItems="center">Your rate submitted.</Box></CardContent>)
    }
    else
    {
      return(<CardContent>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item>
            {" "}
            <Grid
              sx={{ mt: 0.4 }}
              container
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Avatar
                  alt="Remy Sharp"
                  src={matchData.avatarurl}
                  sx={{ width: 100, height: 100 }}
                />
              </Grid>
              <Grid item>
                <Typography
                  color="black"
                  style={{ fontWeight: "bold", fontSize: 20 }}
                >
                  {matchData.name + " " + matchData.surname + ", " + matchData.age}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
          <Grid container
direction="column"
justifyContent="center"
alignItems="center">
  <Grid item>
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        size="large"
        max={10}
        defaultValue={5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
  </Grid>
  <Grid item>{value !== null && (
    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
  )}</Grid>
</Grid>
          </Grid>
          <Grid item>
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
              Send
            </Button>
          </Grid>
        </Grid>
      </CardContent>)
    }
  }

  function handleSubmit(){
    setRated(true);
    console.log(user)
    console.log(value)
  }

  useEffect(() => {
    const queryString = window.location.href;
    id = queryString.match(/match\/(\d+)/)[1];
    fetcData();
  }, []);

  if(!isAvalible)
  {
    return (<h1>Match not in db...</h1>);
  }
  else
  {
    if (!isLoading) {
      return (
        <Grid
          direction="row"
          justifyContent="center"
          alignItems="center"
          container
          spacing={1}
        >
          <Grid>
            <Card
              sx={{ height: 200, width: 1200, mt: 4 }}
              style={{ backgroundColor: "#DAD2BC" }}
            >
              <CardContent>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  <Grid item xs={2}>
                    <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
                      <Grid item><Typography>HOME</Typography></Grid>
                      <Grid item>
                        <Avatar
                          src={matchData.home_logo}
                          sx={{ width: 100, height: 100}}
                        />
                      </Grid>
                      <Grid item>
                        <Typography>
                          {matchData.home_teamname}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid>
                      <Typography
                        color="#A99985"
                        style={{ fontWeight: "bold", fontSize: 75 }}
                      >
                        {matchData.home_score}
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography color="#A99985" style={{ fontSize: 75 }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography
                        sx={{ mr: 10 }}
                        color="#A99985"
                        style={{ fontWeight: "bold", fontSize: 75 }}
                      >
                        {matchData.away_score}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
                      <Grid item><Typography>AWAY</Typography></Grid>
                      <Grid item>
                        <Avatar
                          src={matchData.away_logo}
                          sx={{ width: 100, height: 100}}
                        />
                      </Grid>
                      <Grid item>
                        <Typography>
                          {matchData.away_teamname}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            sx={{ mt: 4 }}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              color="black"
              style={{ fontWeight: "bold", fontSize: 20 }}
            >
              Match Starts
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item>
              <Box sx={{ ml: 12 }}>
                <Grid
                  container
                  spacing={4}
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <CardReasonsCard totalCardsDist={[matchData.home_total_cards, matchData.home_foul_cards, matchData.home_unprofessional_cards, matchData.home_dive_cards, matchData.home_other_cards]} />
                  </Grid>
                  <Grid item>
                    {" "}
                    <RedYellowCardCard numRed={matchData.home_red_cards} numYellow={matchData.home_yellow_cards} />{" "}
                  </Grid>
                  <Grid item>
                    <FoulCard numFoul={matchData.home_fouls} numFoulPerCard={matchData.home_total_cards / matchData.home_fouls * 100} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item>
              <Timeline sx={{ width: 450 }}>
                {timeline.map((item) => (
                  <div
                    key={
                      item.event_id
                    }
                  >
                    {createTimelineItem(
                      item.event_text,
                      item.event_side,
                      item.event_time,
                      item.event_type
                    )}
                  </div>
                ))}
              </Timeline>
            </Grid>
            <Grid item>
              <Box sx={{ mr: 12 }}>
                <Grid
                  container
                  spacing={4}
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                   <Grid item>
                    <CardReasonsCard totalCardsDist={[matchData.away_total_cards, matchData.away_foul_cards, matchData.away_unprofessional_cards, matchData.away_dive_cards, matchData.away_other_cards]} />
                  </Grid>
                  <Grid item>
                    {" "}
                    <RedYellowCardCard numRed={matchData.away_red_cards} numYellow={matchData.away_yellow_cards} />{" "}
                  </Grid>
                  <Grid item>
                    <FoulCard numFoul={matchData.away_fouls} numFoulPerCard={matchData.away_total_cards / matchData.away_fouls * 100} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Grid
            sx={{ mt: 0 }}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              color="black"
              style={{ fontWeight: "bold", fontSize: 20 }}
            >
              Match Ends
            </Typography>
          </Grid>
  
          <Grid>
            <Card
              sx={{ height: 200, width: 800, mt: 4 }}
              style={{ backgroundColor: "#DAD2BC" }}
            >
              {renderRate()}
            </Card>
          </Grid>
        </Grid>
      );
    } else {
      return (<h1>Loading...</h1>);
    }
  }

  
}
