# Veridian Internal IT Support Agent

An AI-assisted internal IT support and request-routing application built for the Veridian Corp. internal service agent assignment.

The application helps employees get policy-grounded IT support, routes requests to the appropriate team or workflow, and provides visibility into employee requests, active tickets, knowledge-base policies, and decision history.

## 🚀 Live Demo

**Live Application:**  
https://veridian-it-support-agent--happypookies03.replit.app

## 📌 Project Overview

The Veridian Internal IT Support Agent is designed to handle common internal IT support scenarios using a controlled knowledge base and predefined company policies.

Instead of inventing solutions, the agent uses the supplied Veridian policy set to determine whether a request can be:

- Resolved through self-service
- Routed to IT
- Routed to Security
- Routed to Finance
- Sent for manager approval
- Sent for human review
- Clarified before taking action

The system also keeps active and closed ticket information visible so that support decisions can be made with relevant request context.

## ✨ Key Features

### AI Support

- Natural-language IT support interface
- Policy-grounded responses
- Knowledge Base policy references
- Request routing and resolution categories
- Clarification questions for vague requests
- Human escalation for unsupported or sensitive requests
- No invented company policies or unsupported approvals

### Employee Requests

Includes all 15 supplied employee requests with:

- Employee name
- Request description
- Request date
- Current status
- Relevant policy handling
- Request-specific context

### Ticket Queue

Includes the supplied ticket history with:

- Ticket IDs
- Request summaries
- Current ticket status
- Active and closed ticket visibility

### Knowledge Base

The application includes the supplied Veridian policies covering:

- Password Reset
- VPN Access
- Laptop Replacement
- Software Installation
- Printer Troubleshooting
- Mailbox Storage
- Guest Wi-Fi
- Expense Software
- Security Incidents
- Work-from-Home Equipment
- Asset Management

### Decision Log

Provides visibility into policy-based decisions and routing logic used by the support agent.

### Dashboard

The dashboard provides a quick overview of:

- Employee requests
- Active tickets
- Closed tickets
- Policy engine status
- Knowledge Base coverage

## 🧠 Example Request Handling

| Request | Policy / Handling |
|---|---|
| Password locked after 5+ failed attempts | IT manual unlock |
| Guest Wi-Fi access | Employee can generate credentials at the front-desk kiosk |
| Expired VPN credentials | Employee renews VPN credentials |
| Contractor VPN access | Manager approval through the access request form |
| Non-catalog software | IT Security review |
| Suspected phishing | Immediate Security reporting |
| WFH equipment | Manager sign-off + Finance processing |
| Mailbox over 25GB | Manager approval required |
| Expense software access | Finance handles access |
| Vague IT issue | Agent asks for clarification |

## 🏗️ Application Structure

The application is organized around the following areas:

```text
Veridian Internal IT Support Agent
│
├── Dashboard
├── AI Support
├── Employee Requests
├── Ticket Queue
├── Knowledge Base
└── Decision Log
