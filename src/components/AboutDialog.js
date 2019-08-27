import React from 'react';
import { ComposedModal, ModalHeader, ModalBody, ModalFooter, Button } from 'carbon-components-react';
import { Grid, Row, Col } from 'react-flexbox-grid';
// import i18next from 'i18next';

const styles = {
    grid: {
        textAlign: 'center',
        height: '10px!important',
        width: '525px',
        minHeight: '10px',
        maxHeight: '900px!important',
        paddingLeft: '0px!important',
        paddingRight: '0px!important',
        marginTop: 0
    },
    row: {
        paddingTop: '20px',
    },
    rowVersionBuild: {
        paddingTop: '5px',
    },
    rowLearnMore: {
        paddingTop: '30px',
    },
    separator: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#D3D3D3',
        marginTop: 5,
    },
}
export const AboutDialog = (props) => {

    const { title, versionNo, buildDate, message, resiliencyHome, onClose } = props;
    const learnMore = "Learn More";//i18next.t('common:about.learnMore');
    const ok = "Ok"; //i18next.t('common:button.ok');

    return (
        <ComposedModal open
            onKeyDown={(event) => { return event.keyCode === 27 ? onClose() : '' }}
            onClose={() => { onClose() }}
        >
            <ModalHeader
                iconDescription={"Close Dialog"} //{i18next.t('common:closeDialog')}
                buttonOnClick={() => { onClose() }}
            >
                <Grid className="about ccpDialog-Grid" style={styles.grid}>
                    <Row style={styles.row}>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <label className="bx--type-gamma">{title}</label>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <Row style={styles.separator}></Row>
                        </Col>
                    </Row>
                </Grid>
            </ModalHeader>
            <ModalBody>
                <Grid className="about ccpDialog-Grid" style={styles.grid}>
                    <Row style={styles.rowVersionBuild}>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <label className="bx--type-epsilon" >{versionNo}</label>
                        </Col>
                    </Row>
                    <Row style={styles.rowVersionBuild}>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <label className="bx--type-epsilon" >{buildDate}</label>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <label className="bx--type-epsilon">{message}</label>
                        </Col>
                    </Row>
                    <Row style={styles.rowLearnMore}>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <Button href={resiliencyHome} target="_blank">{learnMore}</Button>
                        </Col>
                    </Row>
                </Grid>
            </ModalBody>
            <ModalFooter
                primaryButtonText={ok}
                onRequestClose={() => { onClose() }}
                onRequestSubmit={() => { onClose() }}
            />
        </ComposedModal>
    )
}