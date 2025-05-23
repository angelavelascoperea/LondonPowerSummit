
London Power Summit

# LAB: HOW TO CREATE A HUMAN RESOURCES AGENT IN COPILOT STUDIO STEP BY STEP

This is a repository that stores Excel tables, and a step by step guide to create a Human Resources Agent with Copilot Studio.

  1. Sign in [Power Apps](https://make.powerapps.com/) with your user and password
    
![1](https://github.com/user-attachments/assets/e33f01ad-f0b1-4e5f-ae41-8f52293ea622)

  1.1. Choose the Power Summit environment

![1-1](https://github.com/user-attachments/assets/31431ec0-fd95-450f-a881-9cd8cad2faa6)

  2.  Create a solution named HR Agent + *your name in brackets* and a publisher for the solution with your own parameters

![2](https://github.com/user-attachments/assets/5325ce17-b397-4c86-8df2-d28ce5b450dc)

  2.1. Write your name on the Display name, Name and Prefix

![2-1](https://github.com/user-attachments/assets/9c2a77b5-36b5-439f-96d6-a1bbac351805)

  3. Create a new table in the HR solution

![3](https://github.com/user-attachments/assets/1d594ad4-5025-4ef5-a389-8efe2717be8e)

  4. Import Employees excel file 

![4](https://github.com/user-attachments/assets/525aa811-d1ee-4528-bdc3-91899fb0d628)

![4-1](https://github.com/user-attachments/assets/f123dcde-a678-42ba-9b2d-9355d984cc3e)

![4-2](https://github.com/user-attachments/assets/3bbe19f1-3ef1-4dd6-a5d4-923534938ce4)

  4.1. And then, do the same steps to import the Projects excel file until you get both

![4-3](https://github.com/user-attachments/assets/35cd4c34-f567-4d2a-9412-f8baa95c0692)

  5. Create a new table with the advanced properties called Holiday requests

![5](https://github.com/user-attachments/assets/482a7875-72d4-4ed7-8629-0bac8828376d)

![5-1](https://github.com/user-attachments/assets/52349919-8983-4ddc-b433-310bd82c85cc)

  5.1. Once created, we will add:

- 2 date columns (start date and end date)

- 2 text columns (reason and comments)

- 1 number column (Days count)

- 1 choice column (Status)

- 1 lookup column (Employee)

![5-2](https://github.com/user-attachments/assets/8c0ea40c-2a11-4e99-b0d0-a0f17112f748)

following this steps:

- Write the display name

- select the data type

- select some other options if needed

![5 - 3](https://github.com/user-attachments/assets/aaff61e9-3101-40fb-a360-a93886e59699)

![5 - 4](https://github.com/user-attachments/assets/dd020ba1-b0cb-4406-ba17-7203afca4b62)

![5 - 5](https://github.com/user-attachments/assets/376e396f-dc04-4054-8000-ff2adb6007c7)

And now, we have our three tables ready

![5](https://github.com/user-attachments/assets/115f6a90-4d1b-425e-a73d-f4d6f78cefb4)

  6. Create a new agent in the HR solution

![6](https://github.com/user-attachments/assets/7ce8eca3-8e4f-44f0-ad9a-0a18a80c5686)

  7. Skip the copilot help to configure it manually
     
![7](https://github.com/user-attachments/assets/fc169b25-a41c-4020-aa0e-0ae3c58288e1)

  8. Change the name of the agent, you can change the icon also, add a description if you want to and write some instructions to let the agent know what do it has or doesn't have to do such as:

     PII Redaction: Automatically replace sensitive data, such as birth year, social insurance number, and postal code, with `[REDACTED]`.
     
     Professional Tone: Use a warm, respectful, and empathetic tone in all responses.
     
     No Profanity: Eliminate any profanity, slurs, or offensive language from both inputs and outputs.
     
     Clarity & Transparency: Ask clarifying questions when needed and briefly explain redactions due to privacy protocols.
     
     Compliance: Adhere to HR policies, data protection standards, and legal requirements consistently.

![8](https://github.com/user-attachments/assets/6fb0c12e-2452-4534-8957-c632f9c3c55c)

  9. Once created, we are going to add some knowledge sources to our agent

![9](https://github.com/user-attachments/assets/7cde7cb4-5b75-43fb-b6fa-ef0b098ebde9)

The first one will be a non real Company policies document 

![9 - 1](https://github.com/user-attachments/assets/3cf86495-d6d5-4746-b0bd-e6be4b1ceea9)

And the second knowledge source will be Dataverse

![9 - 2](https://github.com/user-attachments/assets/a4f6c468-befb-435f-aa49-815b2832f9d6)

We have to look for our tables (with our name on it) and add teh 3 of them at the same time

![9 - 3](https://github.com/user-attachments/assets/2a556b7e-b590-4d4f-acf1-e5b6f48dc712)

  10. Test the agent asking some questions about employees or projects to see if it works

  11. Now, we are going to create some flows

![11](https://github.com/user-attachments/assets/613dcc54-f31a-44d8-aa30-8f213c62fa9a)

![11 - 1](https://github.com/user-attachments/assets/39d45869-ded3-44a8-9ea2-5b0faf186b55)

  12. The first flow is to create a holiday request

Post a new holiday request with some information like the reason, start date, end date, comments, and the name of the employee
![12](https://github.com/user-attachments/assets/cd0907ac-bb82-4bbd-bb7b-5a02cb24e365)

And once is done, we are going to edit it and follow the steps:

![12 - 1](https://github.com/user-attachments/assets/9099b508-a2f5-49fa-8354-e65b9fa3a704)

![image](https://github.com/user-attachments/assets/3cd8bbed-45c9-4337-a170-85d7c4673a74)

![12 - 2](https://github.com/user-attachments/assets/64732e4a-2ea0-4570-a223-e53e91747796)

![12 - 3](https://github.com/user-attachments/assets/dfa482e6-a4b4-40d5-8e3d-29ebc4e2910e)

![12 - 4](https://github.com/user-attachments/assets/b27b8d9a-b17a-4380-87cd-e823fd3cecdd)

![12 - 5](https://github.com/user-attachments/assets/9592b485-7a74-4ab3-8a6b-1c33f4d89d2a)

first(body('List_rows_|_Get_Employee_id')?['value'])?['ldn_employeesid']
![12 - 6](https://github.com/user-attachments/assets/2ef6d0d4-7360-4642-b46d-cfa2f652a5c7)

![12 - 7](https://github.com/user-attachments/assets/9adaf2ff-0bc5-434f-9612-fbe980c0d5d9)

![12 - 8](https://github.com/user-attachments/assets/e3c30933-1d1b-4f33-a5e6-81ff8023fd68)

![12 - 9](https://github.com/user-attachments/assets/5556d3c7-da22-41a5-8b73-e762ce4af1a3)

![12 - 10](https://github.com/user-attachments/assets/b118dcc4-edea-4818-907a-9e60a90e8ab6)

first(outputs('List_rows_|_Get_Employee_id')?['body/value'])?['ldn_daysoff']
![12 - 11](https://github.com/user-attachments/assets/5a7cecc6-7b54-4d18-a4c6-4cfdcd493ebf)

![12 - 12](https://github.com/user-attachments/assets/41c20f01-a825-4a21-b18d-2be2392f70ca)

![12 - 13](https://github.com/user-attachments/assets/b66ae653-3f25-40ac-8e9b-de81ef805f26)

![12 - 14](https://github.com/user-attachments/assets/e16d9e0e-4daf-43d2-ad8f-cdb2811cde7d)

  13. Test the flow saying to the agent that you want to go on holiday and check if it works

  14. The second flow is to get our previous holiday requests

  14.1. Repeat the 11th step
  
Power Automate flow that is triggered when someone asks the agent about an employee's vacation and returns a list with the reports of that employee's days off requests.
In the response to the user, add a final phrase indicating how many Holidays Days are available, take from the "EmployeeAvailableHolidaysDays" response item.  
Add also the total Days Off that the employee has available in one year period, take it from "EmployeeTotalDaysOff" response item.
![14](https://github.com/user-attachments/assets/93398cd0-65f3-4b3c-8579-3513e3a89273)

And once is done, we are going to edit it and follow the steps:

![14 - 1](https://github.com/user-attachments/assets/7767ac1c-983f-4c5d-8080-f4cbe1408156)

![14 - 2](https://github.com/user-attachments/assets/b4eb8f77-4dd1-4dd1-b82e-f334c63bde48)

![14 - 3](https://github.com/user-attachments/assets/62f3a39f-0f35-44ed-a628-b3fa0fac01cf)

![14 - 4](https://github.com/user-attachments/assets/29a6977a-1c86-4f92-a263-0c3b60218c58)

![14 - 5](https://github.com/user-attachments/assets/012b6b06-88b5-4c43-84b5-df28dc2ad1fd)

![14 - 6](https://github.com/user-attachments/assets/f73c7895-7518-4c94-97db-05e875c5218d)

first(outputs('List_rows_|_Get_employee_id')?['body/value'])?['ldn_employeesid']
![14 - 7](https://github.com/user-attachments/assets/898f5ffd-91ed-438d-ace4-7e0742e09161)

![14 - 8](https://github.com/user-attachments/assets/1c4d7a16-0b44-4624-b954-ca6f72bb8694)

![14 - 9](https://github.com/user-attachments/assets/09df04fa-1e1f-4b18-b3e4-cb02b84592ee)

![14 - 10](https://github.com/user-attachments/assets/0d18a78d-6fe4-4ea5-aec2-b975d2cdbe5b)

![14 - 11](https://github.com/user-attachments/assets/f1faf1a6-6e8a-4592-a046-f876ba7ad308)

![14 - 12](https://github.com/user-attachments/assets/9246ef1b-8176-4303-90ea-67c49a90d84d)

xpath(xml(outputs('Compose_|_Days_Count_JSON')), 'sum(/root/Numbers)')
![14 - 13](https://github.com/user-attachments/assets/cc700c9e-6187-439d-bcd1-2b2aa8c4174f)

![14 - 14](https://github.com/user-attachments/assets/44101493-927a-4dbb-b038-2fa38d6b890c)

first(outputs('List_rows_|_Get_employee_id')?['body/value'])?['ldn_daysoff']
![14 - 15](https://github.com/user-attachments/assets/72aad4bd-9f66-4930-b4b6-51230da54e36)

![14 - 16](https://github.com/user-attachments/assets/f27f8cf0-02e0-401d-b177-79f07c24f4ea)

sub(outputs('Compose_|_Employee_Days_Off'), outputs('Compose_|_Days_Count_Sum'))
![14 - 17](https://github.com/user-attachments/assets/cdafbdee-5bb9-4fc7-8e13-93904643d393)

15. Test the flow saying to the agent to show you someone's holiday request (rememer that this data has to be stored in holiday requests)

