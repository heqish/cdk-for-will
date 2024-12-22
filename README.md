# CDK for Will

This repository contains a simple demo of CDK-based pipeline setup for deploying your project using AWS. Follow the steps below to get started.

---

## Setup Steps

### 1. Clone the Repository
Download this repository to your local environment:

---

### 2. Configure AWS Account
- Create an AWS account if you don't have one.  
- Update the `env.account` value in `bin/will-pip.ts` with your AWS account number:  
  [Update Account Number Here](https://github.com/heqish/cdk-for-will/blob/0c5ff6bc69b0cec49368eab2c8e6d82b985fcd9d/bin/will-pip.ts#L8).

---

### 3. Set Up GitHub Repository
- Create a new, **empty repository** on GitHub.  
- Replace the GitHub repository path in `lib/pipeline-stack.ts` with the path of your newly created repository:  
  [Update GitHub Repository Path Here](https://github.com/heqish/cdk-for-will/blob/0c5ff6bc69b0cec49368eab2c8e6d82b985fcd9d/lib/pipeline-stack.ts#L17).

---

### 4. Generate Personal Access Token
- Create a **Personal Access Token** for your GitHub account 
- Store the token in AWS Secrets Manager and update the secret key in `lib/pipeline-stack.ts`:  
  [Update Secret Key Here](https://github.com/heqish/cdk-for-will/blob/0c5ff6bc69b0cec49368eab2c8e6d82b985fcd9d/lib/pipeline-stack.ts#L18).

---

### 5. Push to Upstream Repository
Push your local changes to your upstream repository:

---

### 6. Create IAM User
- Create an **IAM user** in your AWS account with full access.  
- Record the **Access Key ID** and **Secret Access Key**.

---

### 7. Configure AWS CLI
- Install the AWS CLI on your local machine.  
- Configure your AWS CLI credentials with the IAM user you created:

```bash
aws configure
```

- Verify the setup:

```bash
aws sts get-caller-identity
```

---

### 8. Build and Bootstrap
- Build the project:

```bash
npm run build
```

- Install the AWS CDK CLI:

```bash
npm install -g aws-cdk
```

- Bootstrap your AWS environment:

```bash
cdk bootstrap aws://ACCOUNT_ID/REGION
```

Replace `ACCOUNT_ID` and `REGION` with your AWS account ID and preferred region.

---

### 9. Deploy the CDK Code
Deploy your code to AWS:

```bash
cdk deploy
```

---

### 10. Verify Deployment
- Navigate to the AWS CodePipeline Console
- Review the pipeline status and ensure everything is running as expected.

---

## Contributing
Feel free to open an issue or submit a pull request for improvements or bug fixes. 

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
