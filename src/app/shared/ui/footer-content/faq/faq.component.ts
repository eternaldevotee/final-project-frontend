import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-faq',
  standalone: false,
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {


  faqs = [
    {
      question: 'What is a travel package?',
      answer: 'A travel package is a pre-arranged combination of transportation, accommodation, and sometimes activities or meals, offered at a discounted rate.'
    },
    {
      question: 'Can I customize my travel package?',
      answer: 'Yes, most packages can be customized to include preferred hotels, activities, and travel dates. Contact our support team for assistance.'
    },
    {
      question: 'How do I book a travel package?',
      answer: 'You can book directly through our website by selecting a package and completing the payment process. You’ll receive a confirmation email shortly after.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept credit/debit cards, UPI, net banking, and select wallets. EMI options may be available for certain packages.'
    },
    {
      question: 'Is travel insurance included?',
      answer: 'Travel insurance is not included by default but can be added during checkout for an additional fee.'
    },
    {
      question: 'Can I cancel or reschedule my booking?',
      answer: 'Yes, cancellation and rescheduling policies vary by package. Please refer to the package details or contact support for more information.'
    },
    {
      question: 'Do you offer group discounts?',
      answer: 'Yes, we offer special rates for groups of 5 or more travelers. Please contact our sales team for a custom quote.'
    },
    {
      question: 'Are meals included in the package?',
      answer: 'Some packages include meals, while others do not. Please check the package details for specific inclusions.'
    },
    {
      question: 'How will I receive my travel documents?',
      answer: 'All travel documents including tickets, hotel vouchers, and itinerary will be emailed to you after booking confirmation.'
    },
    {
      question: 'Who do I contact in case of an emergency during travel?',
      answer: 'You can reach our 24/7 travel support helpline listed in your travel documents or contact us via the app.'
    }
  ];




}
