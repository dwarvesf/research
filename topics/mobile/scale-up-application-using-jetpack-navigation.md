---
title: Scale up application using Jetpack navigation
description: Learn how to simplify Android app navigation with Jetpack navigation Component, handling fragment transitions, dynamic start destinations, modular flows, and integration with Firebase Analytics.
date: 2022-11-14
github_id: truong-dwarvesv
icy: 10
redirect:
  - /s/RH3qsg
---

In the past, to implement based on fragment navigation, we used `FragmentManager` and `FragmentTransaction` to

- Manage add/place embbeeded fragments in activity
- Backstack state management
- Ovveride transition animation

In order to enhance stability for this approaching, we need to spend much time and effort, not to mention the UI testing compatibility

## Jetpack navigation

From 2018, the Google introduced the navigation component alpha version and mark it stable version 1.0.0 in early 2019
It wrapppers all complex scenarios in low tier, and provide some definitions to help developer easy to navigate between fragments

In [documentation](https://developer.android.com/guide/navigation), you can found many benefits if you're planning apply it to your current application :

- Handling fragment transactions.
- Handling Up and Back actions correctly by default.
- Providing standardized resources for animations and transitions.
- Implementing and handling deep linking.
- Including Navigation UI patterns, such as navigation drawers and bottom navigation, with minimal additional work.
- Safe Args - a Gradle plugin that provides type safety when navigating and passing data between destinations.
- ViewModel support - you can scope a ViewModel to a navigation graph to share UI-related data between the graph's destinations.

Beside above benefits, the navigation component also give us some disadvantages

- The navigation graph included in XML, our fragment code in kotlin file. The time switching among them could take us more time.
- In addition, we need to define each action for each navigation and the argument for each navigation if you have.
- We need to add one more step it make it compatition with Firebase analysic automatically ([Guideline](https://techdroid.kbeanie.com/2020/08/30/jetpack-navigation-and-firebase-analytics/))

## Problems

1. Imagine we build a fintech application having ~ 100 screens, the xml code to define action, argument, destination is large numbers, so it could make us a messive navigation graph file.
2. Each navigation has to define `startDestination`, how we can make it dynamically E.g: Depend on login state, we should navigate to correctly tartget fragment?

## Solution

1. Modular application to each modular (Authentication, HomePage, Account, Payment and Transfer), each modular will be preseting by an activity with own navigation graph. So how we can handle user scenarion between each activity and get the result

- Start activity for each flow by setting up each sequence as navigator

```Kotlin
/**
 * Transfer Navigator
 */
sealed class TransferNavigator : Parcelable {
    @Parcelize
    data class TransferDetail(val transferModel: TransferModel) : TransferNavigator()

    @Parcelize
    data class ViewAllTransfers(val listTransfers: List<TransferModel>) : TransferNavigator()
}
```

- To launch activity, we will do

```Kotlin
private val transferDetailResult =
    registerForActivityResult(TransferDetailContract()){ result ->
        result.doOnSuccess {
            // TODO: Handle result
        }.doOnCancel {
            // TODO: Other case
        }
}

// Normal case
TransferActivity.goToTransferDetail(requireContext(), item)

// Launch and wait result callback
context.goToTransferDetail(transferDetailResult, item)
```

- To receive the result, you should define contract and provide given expect result like below

```Kotlin
class TransferDetailContract : ActivityResultContract<TransferNavigator, NavigatorResult<String>>() {

    override fun createIntent(context: Context, input: TransferNavigator): Intent {
        return Intent(context, TransferActivity::class.java).apply {
            putExtra(Arg.TransferParam, input)
        }
    }

    override fun parseResult(resultCode: Int, intent: Intent?): NavigatorResult<String> {
        val data = intent?.getStringExtra(Arg.TransferParam)
        return NavigatorResult(resultCode, data)
    }
}
```

and set result in detail activity

```Kotlin
val intent = Intent().apply {
      putExtra(Arg.TransferParam, "Success")
}
requireActivity().setResult(Activity.RESULT_OK, intent)
requireActivity().finish()
```

- To remove extra action, argument, we should define navigation graph as below

```XML
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/transfer_nav"
    app:startDestination="@id/EntryFragment">

    <fragment
        android:id="@+id/EntryFragment"
        android:name="co.mobile.app.feature.transfer.EntryFragment" />

    <fragment
        android:id="@+id/TransferDetail"
        android:name="co.mobile.app.feature.transfer.TransferDetail"/>

    <fragment
        android:id="@+id/ViewAllTransfers"
        android:name="co.mobile.app.feature.transfer.ViewAllTransfers" />
```

2. To resolve the fixed `startDestination` in each navigation graph, you can follow as below

- Each module (activity) will have a fragment named EntryFragment as app:startDestination to handle navigation state in initalization time.

```Kotlin
@AndroidEntryPoint
class EntryFragment : Fragment() {

    private val navigator by arg<TransferNavigator>(Arg.NAVIGATOR)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // To remove EntryFragment from backstack
        val navOptions = NavOptions.Builder()
            .setPopUpTo(R.id.EntryFragment, true)
            .build()

        when (navigator) {
            is TransferNavigator.TransferDetail -> {
                 val bundle = bundleOf(
                    Arg.TRANSFER_MODEL to navigator.transferModel,

                )
                findNavController().navigate(R.id.TransferDetail, bundle, navOptions)
            }
            is TransferNavigator.ViewAllTransfer -> {
                  val bundle = bundleOf(
                    Arg.LIST_MODEL to navigator.listTransfers,

                )
                findNavController().navigate(R.id.ViewAllTransfers, bundle, navOptions)
            }
        }
    }
```

## References

- [PROS and CONS of Android Jetpack navigation Component](https://medium.com/accenture-ix-turkey/pros-and-cons-of-android-jetpack-navigation-component-d7a5e3bcfe50)
- [Jetpack navigation Documentation](https://developer.android.com/jetpack/androidx/releases/navigation)
- [Firebase Analytics with Jetpack navigation](https://techdroid.kbeanie.com/2020/08/30/jetpack-navigation-and-firebase-analytics/)
