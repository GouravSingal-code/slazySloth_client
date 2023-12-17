import React, {useEffect, useState} from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import {capitalizeFirstLetterOfEachWord} from '../../Utils/CapitalCase'
import image from "../../logo_without_background.png";
import AddBoxIcon from '@mui/icons-material/AddBox';
import CenteredForm from "../Form/AddLink";
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {v4 as uuidv4} from "uuid";
import {postRequest} from "../../Fetch/request";
import PopUp from "../Popup/PopUp";
export default function ProfilePage() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [popUpTitle, setPopUpTitle] = React.useState("");
    const [popUpMsg , setPopUpMsg] = React.useState("");
    const [popUpColor , setPopUpColor] = React.useState("red");

    const setPopProps = (title , msg, color) =>{
        setPopUpMsg(msg);
        setPopUpTitle(title);
        setPopUpColor(color);
    }




    const [profileObject,setProfileObject] = useState(JSON.parse(localStorage.getItem('profileObject')))

    const [id,setId] = useState(profileObject["_id"]);
    const [name, setName] = useState(profileObject["name"]);
    const [pic , setPic] = useState(profileObject["pic"]);
    const [email, setEmail] = useState(profileObject["email"]);
    const [state, setState] = useState(profileObject["state"]);
    const [country, setCountry] = useState(profileObject["country"]);
    const [designation, setDesignation] = useState(profileObject["designation"]);
    const [company, setCompany] = useState(profileObject["company"]);
    const [college, setCollege] = useState(profileObject["college"]);
    const [links, setLinks] = useState(profileObject["links"]);

    const iconObject = {
        "github": "github fa-lg",
        "linkedin": "linkedin fa-lg",
        "twitter": "twitter fa-lg",
        "instagram": "instagram fa-lg",
        "facebook": "facebook fa-lg"
    }

    const [tag, setTag] = useState("");
    const [linkName , setLinkName] = useState("");
    const [linkValue , setLinkValue] = useState("");
    const [isFormVisible, setFormVisibility] = useState(false);
    const [formPosition, setFormPosition] = useState({top: 0, left: 0});



    const addLinkButton = (e, tagValue) => {
        // Get the position of the button relative to the document
        const buttonRect = e.target.getBoundingClientRect();
        setTag(tagValue);

        // Set the form position to be just above and to the left of the button
        setFormPosition({
            top: buttonRect.top - 50, // Adjust as needed
            left: buttonRect.left - 265, // Adjust as needed
        });

        // Toggle the form visibility
        setFormVisibility(!isFormVisible);
    };

    const updateLinkArray = (e) =>{
        e.preventDefault();
        setLinks([...links , {
           "name" : linkName,
           "tag" : tag,
           "link" : linkValue
        }]);
        setFormVisibility(!isFormVisible);
    }

    const removeLink = (tag, link) => {
        console.log(tag , link);
        let updatedLinks = links.filter(linkObject => {
            if (tag !== linkObject.tag) return linkObject;
            if (link !== linkObject.link) return linkObject;
        });
        setLinks(updatedLinks);
    }


    const handleInputChange = (event, type) => {
        const value = event.target.value;
        if (type === "name") {
            setName(value);
        } else if (type === "email") {
            setEmail(value);
        } else if (type === "state") {
            setState(value);
        } else if (type === "country") {
            setCountry(value);
        } else if (type === "designation") {
            setDesignation(value);
        } else if (type === "company") {
            setCompany(value);
        } else if (type === "college") {
            setCollege(value);
        } else {
            let updatedLinks = links.map(linkObject => {
                    if (linkObject.tag == "personal" && linkObject.name == type) {
                        linkObject.link = value;
                    }
                    return linkObject;
                }
            );
            setLinks(updatedLinks);
        }
    };


    const saveProfileData  = async (event) =>{
        event.preventDefault();
        // check the email and password
        const newProfileObject = {
            _id:id,
            name:name,
            email:email,
            pic : pic,
            state:state,
            country:country,
            designation:designation,
            company:company,
            college:college,
            links:links
        };

        let postResponse = await postRequest("http://localhost:8000/updateUserInfo", newProfileObject);
        postResponse = JSON.parse(postResponse);
        if( postResponse.status === "200" ){
            localStorage.setItem('profileObject',JSON.stringify(postResponse["_doc"]));
            setPopProps("Hurray", postResponse.message, "green");
            handleOpen();
        }else{
            setPopProps("Alert", postResponse.message, "red");   // setPopProps("Alert" , "email format is not correct");
            handleOpen();
        }
    }

    const linkForGivenKey = (key) => {
        console.log(key);
        const linkObject = links.map(linkObject=>{
            if( linkObject["tag"] === "personal" && linkObject["name"] === key ){
              return linkObject;
            }
        })
        return linkObject.length>0?linkObject["link"]:"";
    }
    useEffect(() => {
    }, [tag]);


    return (
        <section style={{backgroundColor: '#eee'}}>
            <PopUp open={open} handleClose={handleClose} popUpTitle={popUpTitle} popUpMsg={popUpMsg} popUpColor={popUpColor} />
            <CenteredForm isFormVisible={isFormVisible} formPosition={formPosition}
                         setFormVisibility={setFormVisibility}  setLinkName={setLinkName} setLinkValue={setLinkValue} updateLinkArray={updateLinkArray} />
            <MDBContainer className="py-5" style={{opacity: isFormVisible ? '0.5' : '1' , position:"relative"}}>
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    style={{backgroundColor:"transparent" , color:"black" , border:"none" , position:"absolute", right:"0", left:"0", bottom:"0", zIndex:1}}
                    onClick={saveProfileData}
                >
                    Save
                </Button>
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src={image}
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{width: '150px'}}
                                    fluid/>
                                <br/>
                                <p className="text-muted mb-1">
                                    <div>
                                        <input
                                            type="text"
                                            value={capitalizeFirstLetterOfEachWord(designation)}
                                            onChange={(e) => {
                                                handleInputChange(e, "designation")
                                            }}
                                            placeholder={"Designation"}
                                            style={{"border":"none", "width": designation.length != 0?`${designation.length}ch`:`${"Designation".length}ch`}}
                                        />
                                        @
                                        <input
                                            type="text"
                                            value={capitalizeFirstLetterOfEachWord(company)}
                                            onChange={(e) => {
                                                handleInputChange(e, "company")
                                            }}
                                            placeholder={"Company"}
                                            style={{"border":"none", "width": company.length != 0?`${company.length}ch`:`${"Company".length+1}ch`}}
                                        />
                                    </div>
                                </p>
                                <div className="d-flex justify-content-center mb-2">
                                    <MDBBtn>Follow</MDBBtn>
                                    <MDBBtn outline className="ms-1">Message</MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4 mb-lg-0">
                            <MDBCardBody className="p-0">
                                <MDBListGroup flush className="rounded-3">
                                    {links.map((linkObject, index) =>  {
                                            if (linkObject["tag"] === "personal") {
                                        return (<MDBListGroupItem
                                            className="d-flex justify-content-between align-items-center p-3">
                                            <MDBIcon fab icon={linkObject["name"]}
                                                     style={{color: '#333333'}}/>
                                            <MDBCardText>
                                                {linkObject["link"].length == 0 ?
                                                <input
                                                    type="text"
                                                    value={linkObject["link"]}
                                                    placeholder={linkObject["name"] + " link"}
                                                    onChange={(e) => {
                                                        handleInputChange(e, linkObject["name"])
                                                    }}
                                                    style={{border:"none",textAlign:"right"}}/>
                                                :
                                                    <a href={linkObject["link"]}
                                                       style={{
                                                           maxWidth: "50%",
                                                           display: "inline-block",
                                                           overflow: "hidden",
                                                           whiteSpace: "nowrap",
                                                           textOverflow: "ellipsis",
                                                           position: "absolute",
                                                           right: "0%",
                                                           top: "25%"
                                                       }}>{linkObject["link"]}</a>
                                                }
                                            </MDBCardText>
                                        </MDBListGroupItem>)
                                    }})
                                    }
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow
                                >
                                    <MDBCol sm="3">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText
                                            className="text-muted"
                                        >
                                            <div>
                                                <input
                                                    type="text"
                                                    value={capitalizeFirstLetterOfEachWord(name)}
                                                    onChange={(e) => {
                                                        handleInputChange(e, "name")
                                                    }}
                                                    placeholder={"Name"}
                                                    style={{"border":"none", "width": name.length != 0?`${name.length}ch`:`${"Name".length+2}ch`}}
                                                />
                                            </div>
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            <div>
                                                {email}
                                            </div>
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>College</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText
                                            className="text-muted">
                                            <div>
                                                <input
                                                    type="text"
                                                    value={capitalizeFirstLetterOfEachWord(college)}
                                                    onChange={(e) => {
                                                        handleInputChange(e, "college")
                                                    }}
                                                    placeholder={"College"}
                                                    style={{"border":"none", "width": college.length != 0?`${college.length}ch`:`${"College".length}ch`}}
                                                />
                                            </div>
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText
                                            className="text-muted">
                                            <div>
                                                <input
                                                    type="text"
                                                    value={capitalizeFirstLetterOfEachWord(state)}
                                                    onChange={(e) => {
                                                        handleInputChange(e, "state")
                                                    }}
                                                    placeholder={"State"}
                                                    style={{"border":"none", "width": state.length != 0?`${state.length}ch`:`${"State".length}ch`}}
                                                />
                                                ,
                                                <input
                                                    type="text"
                                                    value={capitalizeFirstLetterOfEachWord(country)}
                                                    onChange={(e) => {
                                                        handleInputChange(e, "country")
                                                    }}
                                                    placeholder={"Country"}
                                                    style={{"border":"none", "width": country.length != 0?`${country.length}ch`:`${"Country".length}ch`}}
                                                />
                                            </div>
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBRow>
                            <MDBCol md="6" style={{maxHeight: '320px', overflowY: 'auto'}} >
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <MDBCardText className="mb-4"
                                                     style={{display: "flex", justifyContent: "space-between"}}>
                                            <div>DEV Profile</div>
                                            <div><AddBoxIcon onClick={(e) => {
                                                addLinkButton(e,"dev")
                                            }}/></div>
                                        </MDBCardText>


                                        {links.map((linkObject, index) => {
                                            if (linkObject["tag"] === "dev") {
                                                if (index === 0) {
                                                    return (<>
                                                        <MDBCardText
                                                            className="mb-1"
                                                            style={{
                                                                fontSize: '.77rem',
                                                                display: "flex",
                                                                justifyContent: "space-between"
                                                            }}
                                                        >
                                                            <div><a href={linkObject["link"]}>{linkObject["name"]}</a>
                                                            </div>
                                                            <div style={{
                                                                cursor: "pointer"
                                                            }}><RemoveIcon style={{color: "red"}}
                                                                                 className="name_edit" onClick={(e) => {
                                                                removeLink("dev", linkObject["link"])
                                                            }}/></div>
                                                        </MDBCardText>
                                                    </>)
                                                } else {
                                                    return (<>
                                                        <MDBCardText
                                                            className="mt-4 mb-1"
                                                            style={{
                                                                fontSize: '.77rem',
                                                                display: "flex",
                                                                justifyContent: "space-between"
                                                            }}
                                                        >
                                                            <div><a href={linkObject["link"]}>{linkObject["name"]}</a>
                                                            </div>
                                                            <div style={{
                                                                cursor: "pointer"
                                                            }}><RemoveIcon style={{color: "red"}}
                                                                                 className="name_edit" onClick={(e) => {
                                                                removeLink("dev", linkObject["link"])
                                                            }}/></div>
                                                        </MDBCardText>
                                                    </>)
                                                }
                                            }
                                        })}

                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>

                            <MDBCol md="6"  style={{maxHeight: '320px', overflowY: 'auto'}}>
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <MDBCardText className="mb-4"
                                                     style={{display: "flex", justifyContent: "space-between"}}>
                                            <div>DSA Profile</div>
                                            <div><AddBoxIcon onClick={(e) => {
                                                addLinkButton(e,"dsa")
                                            }}/></div>
                                        </MDBCardText>

                                        {links.map((linkObject, index) => {
                                            if (linkObject["tag"] === "dsa") {
                                                if (index === 0) {
                                                    return (<>
                                                        <MDBCardText
                                                            className="mb-1"
                                                            style={{
                                                                fontSize: '.77rem',
                                                                display: "flex",
                                                                justifyContent: "space-between"
                                                            }}
                                                        >
                                                            <div><a href={linkObject["link"]}>{linkObject["name"]}</a>
                                                            </div>
                                                            <div style={{
                                                                cursor: "pointer"
                                                            }}><RemoveIcon style={{color: "red"}}
                                                                                 className="name_edit" onClick={(e) => {
                                                                removeLink("dsa", linkObject["link"])
                                                            }}/></div>
                                                        </MDBCardText>
                                                    </>)
                                                } else {
                                                    return (<>
                                                        <MDBCardText
                                                            className="mt-4 mb-1"
                                                            style={{
                                                                fontSize: '.77rem',
                                                                display: "flex",
                                                                justifyContent: "space-between"
                                                            }}
                                                        >
                                                            <div>
                                                                <a href={linkObject["link"]}>{linkObject["name"]}</a>
                                                            </div>
                                                            <div style={{
                                                                cursor: "pointer"
                                                            }}><RemoveIcon
                                                                className="name_edit"
                                                                style={{color: "red"}}
                                                                onClick={(e) => {
                                                                    removeLink("dsa", linkObject["link"])
                                                                }}/></div>
                                                        </MDBCardText>
                                                    </>)
                                                }
                                            }
                                        })}

                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}