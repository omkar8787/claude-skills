# Internal sourcing-intelligence research (NOT published on the website)

`suppliers.json` holds **unverified supplier leads**: manufacturers, exporters, publishers and printers found during desk research on 3 Nov 2026. The site never imports or renders this file.

## Status and limits
- **46 leads** were collected (target: 100+). The build environment could not open IndiaMART, TradeIndia, EPCH, FIEO, company websites or the IP India registry directly, so leads came from web-search results of directory listings, trade-press reports and GI record copies.
- Every record is `verificationStatus: "unverified-lead"`. Fields such as MOQ, capacity, certifications and contacts are `null` when no source stated them. **Nothing was inferred or invented.**
- `entityType` keeps publishers, printers, exporters and manufacturers separate, as the brief requires. A "self-described" label means the claim comes from the company's own listing.

## Verification workflow (suggested)
1. Open the `sourceUrl`, then find the company's official website and GSTIN.
2. Verify GSTIN (GST portal), IEC (DGFT) and company registration (MCA).
3. Request a capability statement, certifications (verify each in the issuer database), MOQ and capacity.
4. Update `verificationStatus` (`documents-verified`, `audited`), `researchConfidence` and `verificationDate`.
5. Only then can a supplier be considered for public listing, and only with their written consent.

## Schema (per record)
`id, companyName, city, state, productCategory, entityType, officialWebsite, publicBusinessContact, manufacturingOrTrading, oemCapability, odmCapability, privateLabelCapability, moq, productionCapacity, certifications[], exportExperience, giStatus, sourceUrl, verificationDate, verificationStatus, researchConfidence, notes`

This shape maps directly onto a CMS or database table (e.g. Sanity, Supabase or Airtable) for supplier management, enquiry routing and GI product mapping.
