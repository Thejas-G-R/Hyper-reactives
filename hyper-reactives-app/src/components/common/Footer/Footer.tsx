import React from 'react'
import { connect } from 'react-redux'
import './Footer.scss';
import { constants } from '../../../utils/constants';

export const Footer = (props: any) => {
    return (
        <footer>
            <div className="footer">
                <div className="col-lg-11 innerContent">
                    <div className="disclaimer">
                        {constants.FOOTER_DISCLAIMER_TEXT}
                    </div>
                    <div className="icons">
                        {/* <a ><img/></a> */}
                        <a href='www.linkedin.com'>linkedin</a>
                        <a href='www.linkedin.com'>linkedin</a>
                        <a href='www.linkedin.com'>linkedin</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)