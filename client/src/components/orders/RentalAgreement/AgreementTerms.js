import React from "react";
import PropTypes from "prop-types";

function AgreementTerms(props) {
  return (
    <div className="col-12 mt-4 text-justify">
      <span className="d-block mb-4">
        This agreement is made as of: {props.date}
      </span>
      <span className="d-block mb-4">
        Lessee agrees to pay Lessor the monthly rental rate, delivery and pick
        up charges, sales tax and all other charges referred to herein for the
        use of Equipment. Individuals using Equipment for personal use must
        complete the Customer Information Worksheet prior to rental, if
        requested.
      </span>

      <span className="d-block mb-4">
        Rental payments are on a monthly basis.
      </span>

      <span className="d-block mb-4">
        Lessee shall pay or shall reimburse Lessor for all fees or assessments
        related to the Equipment, its value, use, operation or rental including
        storage related charges attributable to the delayed delivery, pick up
        and/or installation of the Equipment required or requested by the
        Lessee.
      </span>

      <span className="d-block mb-4">
        Payments are net 30 days upon invoicing. Lessee agrees to pay a late
        charge of 1 ½% per month or 18% per annum on balances exceeding 30 days.
      </span>

      <span className="d-block mb-4">
        Lessee assumes all risk of loss or damage to the Equipment (normal wear
        & tear excepted) and all contents therein from any and all causes
        whatsoever. Lessee is liable for all repairs to, and cleaning of, the
        Equipment. Lessee shall not move the Equipment. Lessee shall notify
        Lessor if relocation is required.
      </span>

      <span className="d-block mb-4">
        The Equipment is for domestic storage only and not to be used for any
        other purpose. Lessee agrees to indemnify, defend and hold Lessor
        harmless from any and all losses, claims, or expenses, including, but
        not limited to those arising out of or caused by the negligence of
        Lessor or its agents or employees, related to any loss or damage to the
        Equipment and to any personal injury or property damage related to or
        arising out of the delivery, installation, use, possession, condition,
        return or repossession of the Equipment.
      </span>

      <span className="d-block mb-4">
        Lessee’s failure to make any payment or comply with any terms and
        conditions herein will constitute default. Upon Lessee’s default, Lessor
        has the right to accelerate all payments due hereunder, repossess the
        Equipment and take any action permitted by the Uniform Commercial Code.
        Lessee hereby waives any and all rights to, or claims of sovereign
        immunity. Any property remaining in Equipment upon its return or
        repossession will be subject to a claim or lien and may be sold to
        satisfy the lien if the rent or other charges remain unpaid for 14
        consecutive days. Please provide alternate name and address where
        preliminary lien notice and other subsequent notices may be sent (if
        different than above):
      </span>

      <span className="d-block mb-4" style={{ textAlign: "left !important" }}>
        NAME:_______________________________________________
        ADDRESS:____________________________________________
        CITY:___________________ST:______ZIP:________
      </span>

      <span className="d-block mb-4">
        This Agreement continues on a month-to-month basis after the minimum
        lease term of one month, until the Equipment is returned to Lessor. The
        rental rate may be increased by the Lessor at any given time during the
        rental period. By signing below, the parties agree to the terms and
        conditions stated herein. By signing below, the parties agree that
        Equipment was delivered in good condition.
      </span>

      <span className="d-block mb-4">
        The parties are hereby authorized to accept and rely upon a facsimile
        signature of either party on this Agreement. Any such signature shall be
        treated as an original signature for all purposes.
      </span>
    </div>
  );
}

AgreementTerms.propTypes = {
  date: PropTypes.string.isRequired
};

export default AgreementTerms;
