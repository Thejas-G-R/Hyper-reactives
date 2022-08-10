import React from 'react'
import { connect } from 'react-redux'
import './Footer.scss';
import { constants } from '../../../utils/constants';

export const Footer = (props: any) => {
    return (
        <footer className="footer-06">
            <div className="container">
                <div className="row align-items-center align-items-stretch mb-5">
                    <div className="col-md-4 py-4 py-md-5 aside-stretch d-flex align-items-center an">
                        <div className="w-100">
                            <span className="subheading">Subscribe to our</span>
                            <h3 className="heading-section">Newsletter</h3>
                        </div>
                    </div>
                    <div className="col-md-8 py-4 py-md-5 d-flex align-items-center pl-md-5 aside-stretch-right ann">
                        <form action="#" className="subscribe-form w-100">
                            <div className="form-group d-flex">
                                <input type="text" className="form-control rounded-left" placeholder="Enter email address" />
                                <button type="submit" className="form-control submit"><span>Submit</span></button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-md-3 col-lg-6 order-md-last">
                        <div className="row justify-content-end">
                            <div className="col-md-12 col-lg-9 text-md-right mb-md-0 mb-4">
                                <h2 className="footer-heading"><a href="#" className="logo">AutoMate</a></h2>
                                <p className="copyright">
                                    Copyright &copy; No rights reserved, Haha |  This website was made with Love and is a demo site only
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 col-lg-6">
                        <div className="row">
                            <div className="col-md-4 mb-md-0 mb-4">
                                <h2 className="footer-heading">Northeastern</h2>
                                <ul className="list-unstyled">
                                    <li><a href="https://www.northeastern.edu/" className="py-1 d-block"><span className="ion-ios-checkmark-circle-outline mr-2"></span>Our University</a></li>
                                    <li><a href="https://www.northeastern.edu/graduate/program/master-of-science-in-information-systems-boston-5278/" className="py-1 d-block"><span className="ion-ios-checkmark-circle-outline mr-2"></span>Our Program</a></li>
                                </ul>
                            </div>
                            <div className="col-md-4 mb-md-0 mb-4">
                                <h2 className="footer-heading">Application</h2>
                                <ul className="list-unstyled">
                                    <li><a href="#" className="py-1 d-block"><span className="ion-ios-checkmark-circle-outline mr-2"></span>Landing Page</a></li>
                                </ul>
                            </div>
                            <div className="col-md-4 mb-md-0 mb-4">
                                <h2 className="footer-heading">Developers</h2>
                                <ul className="list-unstyled">
                                    <li><a href="https://www.linkedin.com/in/thejasgr/" className="py-1 d-block"><span className="ion-ios-checkmark-circle-outline mr-2"></span>Thejas</a></li>
                                    <li><a href="https://www.linkedin.com/in/vikasvshastry/" className="py-1 d-block"><span className="ion-ios-checkmark-circle-outline mr-2"></span>Vikas</a></li>
                                    <li><a href="https://www.linkedin.com/in/pramod-sony/" className="py-1 d-block"><span className="ion-ios-checkmark-circle-outline mr-2"></span>Pramod info</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>






        /* <footer>
            <div className="footer">
                <div className="col-lg-11 innerContent">
                    <div className="disclaimer">
                        {constants.FOOTER_DISCLAIMER_TEXT}
                    </div>
                    <div className="icons">
                         <a ><img/></a> 
                        <a href='www.linkedin.com'>linkedin</a>
                        <a href='www.linkedin.com'>linkedin</a>
                        <a href='www.linkedin.com'>linkedin</a>
                    </div >
                </div >
            </div >
        </footer > */
    )
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)