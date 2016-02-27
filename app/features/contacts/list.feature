Feature: Contact List

  Background:
    Given I visit ContactList screen

  Scenario: Message should show when there are no contacts
    Given there are no contacts
    Then the list should show the message 'You have no contacts'
        But should not show any contacts

  Scenario: Contacts should show on list
    Given there is one contact
    Then a contact should show on the list

  Scenario: Contact list should be scrollable
    Given there are more than 10 contacts
    Then I should be able to scroll to see more contacts
    
  Scenario: Add contact button should visit the AddContact screen
    When Add Contact is pressed
    Then it should open the AddContact screen
    
  Scenario: Clicking a contact should go to contact screen
    When a Contact is pressed
    Then it should open the Contact screen
    
  Scenario: Clicking a contact should go to correct contact
    When a Contact is pressed
    Then it should open the Contact screen
        And the title should show the contact name