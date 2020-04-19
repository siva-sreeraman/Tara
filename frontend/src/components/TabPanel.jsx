import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const greeting = "hello";
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 600,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const projectTypes = [
    { value: "Feature movie (Cinema)" },
    { value: "Short Film" },
    { value: "Feature movie (TV)" },
    { value: "Feature movie (TV, event)" },
    { value: "Feature movie (TV, Series)" },
    { value: "TV Mini Series" },
    { value: "TV Series" },
    { value: "TV Show" },
    { value: "TV Magazine" },
    { value: "TV Report" },
    { value: "Documentary (Cinema)" },
    { value: "Documentary (TV)" },
    { value: "Documentary (Series)" },
    { value: "Documentary (Mini Series)" },
    { value: "Dramatized Documentary" },
    { value: "Commercial" },
    { value: "Corporate Film" },
    { value: "Product Film" },
    { value: "Business Movie" },
    { value: "Recruiting Spot" },
    { value: "Image Film" },
    { value: "Exploratory Film" },
    { value: "Industrial Film" },
    { value: "Video Clip" },
    { value: "Social Media" },
    { value: "Stage Production" },
    { value: "Photography" },
    { value: "Newscast" },
    { value: "Event Film" },
    { value: "Augmented Reality" },
    { value: "Virtual Reality" },
    { value: "Factual " },
    { value: "Infotainment" },
    { value: "Reality" },
    { value: "Scripted Reality" },
  ];
  const coreFunctions = [
    { value: "Production Calendar" },
    { value: "Shooting Scheduling" },
    { value: "Call Sheets" },
    { value: "Financing" },
  ];
  const deptFunctions = [
    { value: "Locations and sets" },
    { value: "Cast " },
    { value: "Costumes" },
    { value: "Hair and makeup" },
    { value: "Production design (cars, props etc)" },
    { value: "Stunts" },
    { value: "Choreography" },
    { value: "Visual Effects" },
    { value: "Marketing" },
  ];
  const handleChange = (event, newValue) => {
    // setValue(newValue);
    console.log("Project type: " + JSON.stringify(newValue.props, null, 2));
    projectFormValue.projectType = newValue.props.value;
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const projectFormValue = {};

  const handleFormChange = (e) => {
    projectFormValue[e.target.name] = e.target.value;
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Create project" {...a11yProps(0)} />
        <Tab label="Create project template" {...a11yProps(1)} />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <form className={classes.root} noValidate>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-basic"
                  label="Project Name"
                  variant="outlined"
                  name="projectName"
                  onChange={handleFormChange}
                />
              </FormControl>
            </div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                Project Type
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                // open={open}
                // onClose={handleClose}
                // onOpen={handleOpen}
                // value={age}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {projectTypes.map((type) => (
                  <MenuItem value={type.value}>{type.value}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={coreFunctions}
                getOptionLabel={(each) => each.value}
                // onChange={this.handleOnChangeSkills}
                // defaultValue={this.props?.studentSkills}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Core Functions"
                    placeholder="Enter functions"
                  />
                )}
              />
              {/* <section className="skills-chips">
                {this.props?.studentSkills?.map(skill => (
                  <Chip className="skill-chip" label={skill.skill} />
                ))}
              </section> */}
            </FormControl>
            <FormControl className={classes.formControl}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={deptFunctions}
                getOptionLabel={(each) => each.value}
                // onChange={this.handleOnChangeSkills}
                // defaultValue={this.props?.studentSkills}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Department Function"
                    placeholder="Enter functions"
                  />
                )}
              />
              {/* <section className="skills-chips">
                {this.props?.studentSkills?.map(skill => (
                  <Chip className="skill-chip" label={skill.skill} />
                ))}
              </section> */}
            </FormControl>
            <div>
              <button
                type="button"
                className="btn btn-primary btn-create-project"
              >
                Create Project
              </button>
            </div>
          </form>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <form className={classes.root} noValidate>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-basic"
                  label="Project Template Name"
                  variant="outlined"
                />
              </FormControl>
            </div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                Template Name
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                // open={open}
                // onClose={handleClose}
                // onOpen={handleOpen}
                // value={age}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {projectTypes.map((type) => (
                  <MenuItem value={10}>{type.value}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={coreFunctions}
                getOptionLabel={(each) => each.value}
                // onChange={this.handleOnChangeSkills}
                // defaultValue={this.props?.studentSkills}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Core Functions"
                    placeholder="Enter functions"
                  />
                )}
              />
              {/* <section className="skills-chips">
                {this.props?.studentSkills?.map(skill => (
                  <Chip className="skill-chip" label={skill.skill} />
                ))}
              </section> */}
            </FormControl>
            <FormControl className={classes.formControl}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={deptFunctions}
                getOptionLabel={(each) => each.value}
                // onChange={this.handleOnChangeSkills}
                // defaultValue={this.props?.studentSkills}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Department Function"
                    placeholder="Enter functions"
                  />
                )}
              />
              {/* <section className="skills-chips">
                {this.props?.studentSkills?.map(skill => (
                  <Chip className="skill-chip" label={skill.skill} />
                ))}
              </section> */}
            </FormControl>
            <div>
              <button
                type="button"
                className="btn btn-primary btn-create-project"
              >
                Create Project Template
              </button>
            </div>
          </form>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

// export default class FullWidthTabs extends React.Component
// {constructor(props) {
//   super(props);
//   this.state = {
//   classes : useStyles(),
//   theme: useTheme(),
//   [value, setValue] : React.useState(0),
//   projectTypes : [
//     { value: "Feature movie (Cinema)" },
//     { value: "Short Film" },
//     { value: "Feature movie (TV)" },
//     { value: "Feature movie (TV, event)" },
//     { value: "Feature movie (TV, Series)" },
//     { value: "TV Mini Series" },
//     { value: "TV Series" },
//     { value: "TV Show" },
//     { value: "TV Magazine" },
//     { value: "TV Report" },
//     { value: "Documentary (Cinema)" },
//     { value: "Documentary (TV)" },
//     { value: "Documentary (Series)" },
//     { value: "Documentary (Mini Series)" },
//     { value: "Dramatized Documentary" },
//     { value: "Commercial" },
//     { value: "Corporate Film" },
//     { value: "Product Film" },
//     { value: "Business Movie" },
//     { value: "Recruiting Spot" },
//     { value: "Image Film" },
//     { value: "Exploratory Film" },
//     { value: "Industrial Film" },
//     { value: "Video Clip" },
//     { value: "Social Media" },
//     { value: "Stage Production" },
//     { value: "Photography" },
//     { value: "Newscast" },
//     { value: "Event Film" },
//     { value: "Augmented Reality" },
//     { value: "Virtual Reality" },
//     { value: "Factual " },
//     { value: "Infotainment" },
//     { value: "Reality" },
//     { value: "Scripted Reality" }
//   ],
//   coreFunctions : [
//     { value: "Production Calendar" },
//     { value: "Shooting Scheduling" },
//     { value: "Call Sheets" },
//     { value: "Financing" }
//   ],
//   deptFunctions:[
//     { value: "Locations and sets" },
//     { value: "Cast " },
//     { value: "Costumes" },
//     { value: "Hair and makeup" },
//     { value: "Production design (cars, props etc)" },
//     { value: "Stunts" },
//     { value: "Choreography" },
//     { value: "Visual Effects" },
//     { value: "Marketing" }
//   ],}}

//  handleChange = (event, newValue) => {
//     setValue(newValue);
//   }
//  handleChangeIndex = index => {
//     setValue(index);
//   };

//   render(){return (
//     <div className={classes.root}>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         indicatorColor="primary"
//         textColor="primary"
//         variant="fullWidth"
//         aria-label="full width tabs example"
//       >
//         <Tab label="Create project" {...a11yProps(0)} />
//         <Tab label="Create project template" {...a11yProps(1)} />
//       </Tabs>
//       <SwipeableViews
//         axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//         index={value}
//         onChangeIndex={handleChangeIndex}
//       >
//         <TabPanel value={value} index={0} dir={theme.direction}>
//           <form className={classes.root} noValidate>
//             <div>
//               <FormControl className={classes.formControl}>
//                 <TextField
//                   id="outlined-basic"
//                   label="Project Name"
//                   variant="outlined"
//                 />
//               </FormControl>
//             </div>
//             <FormControl className={classes.formControl}>
//               <InputLabel id="demo-controlled-open-select-label">
//                 Project Type
//               </InputLabel>
//               <Select
//                 labelId="demo-controlled-open-select-label"
//                 id="demo-controlled-open-select"
//                 // open={open}
//                 // onClose={handleClose}
//                 // onOpen={handleOpen}
//                 // value={age}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="">
//                   <em>None</em>
//                 </MenuItem>
//                 {projectTypes.map(type => (
//                   <MenuItem value={10}>{type.value}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             <FormControl className={classes.formControl}>
//               <Autocomplete
//                 multiple
//                 id="tags-standard"
//                 options={coreFunctions}
//                 getOptionLabel={each => each.value}
//                 // onChange={this.handleOnChangeSkills}
//                 // defaultValue={this.props?.studentSkills}
//                 renderInput={params => (
//                   <TextField
//                     {...params}
//                     variant="standard"
//                     label="Core Functions"
//                     placeholder="Enter functions"
//                   />
//                 )}
//               />
//               {/* <section className="skills-chips">
//                 {this.props?.studentSkills?.map(skill => (
//                   <Chip className="skill-chip" label={skill.skill} />
//                 ))}
//               </section> */}
//             </FormControl>
//             <FormControl className={classes.formControl}>
//               <Autocomplete
//                 multiple
//                 id="tags-standard"
//                 options={deptFunctions}
//                 getOptionLabel={each => each.value}
//                 // onChange={this.handleOnChangeSkills}
//                 // defaultValue={this.props?.studentSkills}
//                 renderInput={params => (
//                   <TextField
//                     {...params}
//                     variant="standard"
//                     label="Department Function"
//                     placeholder="Enter functions"
//                   />
//                 )}
//               />
//               {/* <section className="skills-chips">
//                 {this.props?.studentSkills?.map(skill => (
//                   <Chip className="skill-chip" label={skill.skill} />
//                 ))}
//               </section> */}
//             </FormControl>
//             <div>
//               <button
//                 type="button"
//                 className="btn btn-primary btn-create-project"
//               >
//                 Create Project
//               </button>
//             </div>
//           </form>
//         </TabPanel>
//         <TabPanel value={value} index={1} dir={theme.direction}>
//           <form className={classes.root} noValidate>
//             <div>
//               <FormControl className={classes.formControl}>
//                 <TextField
//                   id="outlined-basic"
//                   label="Project Template Name"
//                   variant="outlined"
//                 />
//               </FormControl>
//             </div>
//             <FormControl className={classes.formControl}>
//               <InputLabel id="demo-controlled-open-select-label">
//                 Template Name
//               </InputLabel>
//               <Select
//                 labelId="demo-controlled-open-select-label"
//                 id="demo-controlled-open-select"
//                 // open={open}
//                 // onClose={handleClose}
//                 // onOpen={handleOpen}
//                 // value={age}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="">
//                   <em>None</em>
//                 </MenuItem>
//                 {projectTypes.map(type => (
//                   <MenuItem value={10}>{type.value}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             <FormControl className={classes.formControl}>
//               <Autocomplete
//                 multiple
//                 id="tags-standard"
//                 options={coreFunctions}
//                 getOptionLabel={each => each.value}
//                 // onChange={this.handleOnChangeSkills}
//                 // defaultValue={this.props?.studentSkills}
//                 renderInput={params => (
//                   <TextField
//                     {...params}
//                     variant="standard"
//                     label="Core Functions"
//                     placeholder="Enter functions"
//                   />
//                 )}
//               />
//               {/* <section className="skills-chips">
//                 {this.props?.studentSkills?.map(skill => (
//                   <Chip className="skill-chip" label={skill.skill} />
//                 ))}
//               </section> */}
//             </FormControl>
//             <FormControl className={classes.formControl}>
//               <Autocomplete
//                 multiple
//                 id="tags-standard"
//                 options={deptFunctions}
//                 getOptionLabel={each => each.value}
//                 // onChange={this.handleOnChangeSkills}
//                 // defaultValue={this.props?.studentSkills}
//                 renderInput={params => (
//                   <TextField
//                     {...params}
//                     variant="standard"
//                     label="Department Function"
//                     placeholder="Enter functions"
//                   />
//                 )}
//               />
//               {/* <section className="skills-chips">
//                 {this.props?.studentSkills?.map(skill => (
//                   <Chip className="skill-chip" label={skill.skill} />
//                 ))}
//               </section> */}
//             </FormControl>
//             <div>
//               <button
//                 type="button"
//                 className="btn btn-primary btn-create-project"
//               >
//                 Create Project Template
//               </button>
//             </div>
//           </form>
//         </TabPanel>
//       </SwipeableViews>
//     </div>
//   );}

// }
