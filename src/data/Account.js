class Account {
    constructor({id, parentId, companyName, leadId = null, industry, revenue,billingAddress, description, type, website, clientRating, vat, parent = null, active}) {
      this.id = id;
      this.parentId = parentId;
      this.companyName = companyName;
      this.leadId = leadId;
      this.industry = industry;
      this.revenue = revenue;
      this.billingAddress = billingAddress;
      this.description = description;
      this.type = type;
      this.website = website;
      this.clientRating = clientRating;
      this.vat = vat;
      this.parent = parent;
      this.active = active;
    }
}