import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';
import { CloudHeader, InteriorLeftNavHeader, InteriorLeftNav, InteriorLeftNavList, InteriorLeftNavItem } from 'carbon-addons-cloud-react';
import { helpElements } from '../helpElements';
import { Link } from 'react-router-dom';
import HelpCore from './HelpCore';
import { format } from 'date-fns';
import { AboutDialog } from './AboutDialog';
import packageJson from '../../package.json';

export default function Main(props) {
    const [tag, setTag] = useState();
    const [htmlContent, setHtmlContent] = useState();
    const [menuOpen, setMenuOpen] = useState(false);
    const [openAbout, setOpenAbout] = useState(false);
    const [aboutHeader, setAboutHeader] = useState('');
    const [aboutVersion, setAboutVersion] = useState('');
    const [aboutBuildDate, setAboutBuildDate] = useState('');
    const [aboutMessage, setAboutMessage] = useState('');
    const [resiliencyUrl, setResiliencyUrl] = useState(''); 

    useEffect(() => {        
        window.onLogoClick = prepareAboutDetails;
    }, []); // simulate componentDidMount() life cycle

    useEffect(() => {
        console.log('useEffect hit! - going to load html');
        loadHtml();
    }, [tag]); // trigger effect when tag changes

    useEffect(() => {
        console.log('useEffect hit (location): ', props.location);
        initLocation();
    }, [props.location]); // trigger effect when props location changes

    
    const extractBuildDate = () => {
        const htmlText = document.documentElement.innerHTML;
        const extractedText = htmlText.match(/Build date\/time.*?-->/g);
        let buildDate = extractedText ? extractedText.toString().replace('Build date/time: ', '').replace('-->', '') : '';
        return buildDate;
    }
    const initLocation = () => {
        let location = props.location;
        console.log('itemClicked (location): ', location);
        const params = queryString.parse(location.search)
        const route = helpElements.find(({ id }) => id === params.id)
        const tag = (route && route.items) ? route.items.find(({ id }) => id === params.tag) : undefined;
        setTag(tag);
    }
    const itemClicked = () => {
        // trigger closure of menu
        let button = document.getElementsByClassName('bx--cloud-header__app-menu');
        if (button && button.length > 0) {
            button[0].click();
            setMenuOpen(false);
        }
    }
    const loadHtml = () => {
        if (tag && tag.html) {
            var options = {
                method: 'GET',
                url: tag.html,
            }
            return axios(options)
                .then(function (res) {
                    console.log('result: ' + res);
                    setHtmlContent(ReactHtmlParser(res.data));
                });
        }
    }
    const menuClicked = (ev) => {
        let menuOpen = document.getElementById('leftNav') ? true : false;
        if (menuOpen) {
            setMenuOpen(menuOpen);
        } else {
            // it might have just been closed
            setMenuOpen(false);
        }
    }    
    const prepareAboutDetails = () => {
        const versionNo = packageJson.version;
        const datePattern = 'YYYY.MM.DD'; // t('common:about.buildDateFormat') ? t('common:about.buildDateFormat').toUpperCase() : 'YYYY.MM.DD';
        const extrBuildDate = extractBuildDate();
        const formattedDate = extrBuildDate ? format(extrBuildDate, datePattern) : '';
        const title = "About Business Resiliency Analytics and Logical Dependency Mapping Framework Help System"; // t('common:about.resiliencyClientConnectPortalAbout');
        const version = "Version: " + versionNo; //t('common:about.version', { version: versionNo });
        const buildDate = "Build Date: " + formattedDate; //t('common:about.buildDate', { buildDate: formattedDate });
        const message = "To learn more about Business Resiliency Services, click the learn more button."; //t('common:about.resiliencyClientConnectPortalLearnMore');
        const resiliencyHome = "https://www.ibm.com/services/resiliency";  
        
        setAboutHeader(title);
        setAboutVersion(version);
        setAboutBuildDate(buildDate);
        setAboutMessage(message);
        setResiliencyUrl(resiliencyHome);
        setOpenAbout(true);
    }
    const renderLogo = () => {
        return () => (
            <img className={"IBMLogo"} alt={"IBM"} src={"../images/IBM-8bar-30pt.svg"} />
        )
    }
    const renderItem = (item, routeId, index) => {
        return (
            <InteriorLeftNavItem href="#" key={item.id + index}>
                <Link to={'help?id=' + routeId + '&tag=' + item.id}
                    onClick={(ev) => itemClicked(ev)}
                >
                    {item.name}
                </Link>
            </InteriorLeftNavItem>
        )
    }
    const renderList = (route, i) => {
        return (
            <InteriorLeftNavList key={route.id + i} title={route.name}>
                {route.items &&
                    route.items.map((item, index) => {
                        return renderItem(item, route.id, index)
                    })
                }
            </InteriorLeftNavList>
        )
    }
    const renderMenu = () => {
        console.log("render menu helpElements.... ", helpElements);
        return () => (
            <InteriorLeftNav id="leftNav">
                <InteriorLeftNavHeader>Help Items</InteriorLeftNavHeader>
                {helpElements &&
                    helpElements.map((route, i) => {
                        return renderList(route, i)
                    })
                }
            </InteriorLeftNav>
        )
    }
    return (
        <>
            <CloudHeader
                className="sticky"
                companyName=""
                productName="Business Resiliency Analytics and Logical Dependency Mapping Framework Help System"
                logoHref='javascript:void(onLogoClick())'
                renderMenu={renderMenu()}
                renderLogo={renderLogo()}
                onClick={(ev) => setTimeout(() => menuClicked(ev), 2)}
            />
            {openAbout &&
                <AboutDialog
                    title={aboutHeader}
                    versionNo={aboutVersion}
                    buildDate={aboutBuildDate}
                    message={aboutMessage}
                    resiliencyHome={resiliencyUrl}
                    onClose={() => setOpenAbout(false)}
                />
            }
            <HelpCore menuExpanded={menuOpen} htmlContent={htmlContent} />
        </>
    );
}
