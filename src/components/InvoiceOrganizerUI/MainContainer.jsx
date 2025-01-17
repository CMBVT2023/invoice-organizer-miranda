import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import { ChangeLogDisplay } from "../ChangeLog/ChangeLogDisplay";
import { DirectoryDisplay } from "../DirectoryDisplay/DirectoryDisplay";
import { InvoiceViewer } from "../InvoiceViewer/InvoiceViewer";
import { DirectoryFilter } from "../DirectoryDisplay/UserInteraction/DirectoryFilter";
import { YearSelector } from "../DirectoryDisplay/UserInteraction/YearSelector";
import Container from "react-bootstrap/esm/Container";
import Stack from "react-bootstrap/esm/Stack";

import styles from './styles/MainContainerStyles.module.css'

export function MainContainer(props) {

    return (
        <Row className={`${styles.mainContainer}`}>
            <Col mobilePortrait={12} mobileLandscape={6} tabletPortrait={12} tabletLandscape={4} className={`p-0 h-25 h-mobileLandscape-100 h-tabletPortrait-25 h-tabletLandscape-100`}>
                <Container className="h-100">
                    <Row className="h-100">
                        <Col mobilePortrait={12} tabletPortrait={9} tabletLandscape={12} className="p-0 order-1 order-tabletPortrait-2 order-tabletLandscape-1 h-100 h-tabletLandscape-75">
                            <Stack gap={2} className="h-100">
                                <Stack direction="horizontal" gap={1} className="h-auto">
                                    <DirectoryFilter filter={[props.directoryFilter, props.alterDirectoryFilter]} isDisabled={props.isUserInteractionDisabled} />
                                    <YearSelector isDisabled={props.isUserInteractionDisabled} yearOffSet={props.userSettings.YEAR_OFFSET} />
                                </Stack>

                                <DirectoryDisplay directoryFilter={props.directoryFilter} fetchKey={`${props.pageName}-customerFolders`}
                                    updateIsLoadingBoolean={props.updateIsLoadingBoolean} sortFile={props.sortFile} endPoint={`${props.endPointURL}/${props.pageName}`} showQuickTransferButtons={props.userSettings.SHOW_QUICK_TRANSFER_BUTTONS}/>
                            </Stack>
                        </Col>
                    
                        {/* Add the user setting to control how many changeLog actions are displayed in the quick view*/}
                        <Col className={`d-none d-tabletPortrait-flex order-2 order-tabletPortrait-1 order-tabletLandscape-2 p-0 p-tabletPortrait-1 p-tabletLandscape-0 h-100 h-tabletLandscape-25 overflow-auto`} mobilePortrait={12} tabletPortrait={3} tabletLandscape={12}>
                            <Stack>
                                <ChangeLogDisplay endPoint={`${props.endPointURL}/${props.pageName}`} changeLog={props.changeLog.slice(0, props.userSettings.CHANGELOG_QUICK_VIEW)} alterChangeLog={props.alterChangeLog} showUndoButtons={props.userSettings.SHOW_QUICK_UNDO_BUTTONS} />
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </Col>

            <Col mobilePortrait={12} mobileLandscape={6} tabletPortrait={12} tabletLandscape={8} className={`p-0 h-75 h-mobileLandscape-100 h-tabletPortrait-75 h-tabletLandscape-100`}>
                <InvoiceViewer styles={styles} updateIsLoadingBoolean={props.updateIsLoadingBoolean} endPoint={`${props.endPointURL}/${props.pageName}`} fetchKey={`${props.pageName}-invoiceViewer`} />
            </Col>
        </Row>
    )
}