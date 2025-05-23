---
title: null
description: null
date: null
tags:
  - 101
  - engineering
  - integration
  - testing
redirect:
  - /s/SlSJSw
---

Today, information systems such as Enterprise Resource Planning (ERP), Customer Relation Management (CRM) and Supply Chain Management (SCM are very large, inter-linked through a number of applications and platforms, and spread over different organizations. These large and complex systems must be designed and tested carefully. If this kind of systems is only being tests by the traditional method such as unit test, functional test, then it is impossible to determine whether the whole system will work well or not. Finding defects after the entire system is fully implemented will be very costly, especially because several organizations will have to be involved in the finding and fixing problems. An integration test is needed as its objective is to gain insight into the quality of the implementation of the entire system. By adding an integration test to the traditional set of tests, many risks could be identified and fixed.

## An integration test consists of several steps.

**The first step** is determining a testing strategy. The purpose is to construct a “cooperating testing approach”, because there are often several organizations involved in the development of the total systems. Without a testing strategy, no one will be responsible for the entire systems, and there is a chance that systems will work well on their own but not in combination with other systems. Therefore, integration test is necessary to test the actual integration of the entire systems as an objective, and to make one central group responsible for testing. Another thing to consider in the strategy is that the functional working of systems should be proven before the start of the integration test. In this case the integration test can focus on testing the implementation of specifications and the testing of infrastructure. If this precondition is not met, the integration test is often become a mere functional test of the systems. It is also important that the scope for the integration test has to be clearly defined or else various unrelated things may be included in the integration test and make it more complex than it has to be.

**Communication** on the integration test is important. The people involved often do not know each other as they are working at different organizations with different systems, It is important that everybody understand and get involved in integration test to avoid any miscommunication or any problem later on. In the ideal situation, a testing environment must be established, which is identical to the production environment and is dedicated to the integration. Often the various environments are just tied together, which causes an unreliable outcome of the test.

**The second step** is about Planning. At this time a manager, responsible for the integration test must be assigned. This manager should make sure that all organizations involved must have one coordinator to work together to ensure the integration will work seamlessly. The integration manager has to know all the planning of the subsystems in order to setup the overall planning for the integration test. This integrated planning is mandatory. If one of the system is delayed, the sequence of the tests and priorities are affected, which causes a domino effect to the planning. This is especially critical for the integration, as a chain is just as strong as its weakest link. Thus, the planning for the integration test should be prepared including all dependencies and with enough time in case of delay.

**The third step** is about set up test-cases. The expertise and experience of the people supporting the test should be used to develop a common set of test cases. All testers have to agree on the set of test-cases to ensure the entire system will be tested. During preparations there will be issues so testers must quickly find solution which may impact the processes of one of the systems. It is recommended that integration manager establish a forum where all representatives, one from each organization meet. Such a forum guarantees that everyone knows the status of the integration test and possible problems before testing start.

**The fourth step** is to execute the integration test. This is a critical moment as it needs special attention. Because of the complexity of the test environment, it is important to perform an intake on the environment to make sure everything work perfectly. After that, testing can begin, and in these tests the traditional stages can be applied to the order of the tests. Regarding any issue that arises, integration issues have to be documented and accessible to involved parties. The moment of test execution must be carefully planned because of all the organizations involved, it is absolutely necessary to have support teams stand by, e.g. Infrastructure teams and developers to provide support. The last point of attention is that the version of the test object and the test infrastructure need to be checked because with this test both the software and the infrastructure are likely to be complex and needs extra attention.

**The fifth step** is reporting the results. There are several ways of reporting from one group to others using appropriate channel. In complex information systems, the execution of integration test is the only way to ensure that the end result consists of all components from all subsystems.
