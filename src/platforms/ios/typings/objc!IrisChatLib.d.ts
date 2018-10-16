
declare class ICChatViewController extends SLKTextViewController {

	static alloc(): ICChatViewController; // inherited from NSObject

	static new(): ICChatViewController; // inherited from NSObject

	static slk_currentFirstResponder(): ICChatViewController; // inherited from UIResponder
}

declare class ICNavigationController extends UINavigationController {

	static alloc(): ICNavigationController; // inherited from NSObject

	static new(): ICNavigationController; // inherited from NSObject

	static slk_currentFirstResponder(): ICNavigationController; // inherited from UIResponder
}

declare class IrisChatLib extends NSObject {

	static alloc(): IrisChatLib; // inherited from NSObject

	static initIrisChatLibraryWithSecret(applicationSecret: string): IrisChatLib;

	static initIrisChatLibraryWithSecretAndBaseUrlAndSslPinningKeyOneAndSslPinningKeyTwoAndSsLPinningErrorMessage(applicationSecret: string, baseUrl: string, sslPinningKeyOne: string, sslPinningKeyTwo: string, sslPinningErrorMessage: string): IrisChatLib;

	static initIrisChatLibraryWithSecretAndBaseUrlAndSslPinningKeyOneAndSslPinningKeyTwoAndSsLPinningErrorMessageAndHttpHeaders(applicationSecret: string, baseUrl: string, sslPinningKeyOne: string, sslPinningKeyTwo: string, sslPinningErrorMessage: string, httpHeaders: NSDictionary<any, any>): IrisChatLib;

	static initIrisChatLibraryWithSecretRootViewController(applicationSecret: string, rootViewController: UIViewController): IrisChatLib;

	static initIrisChatLibraryWithSecretRootViewControllerAndBaseURLAndSLLPinningAndSSLPublicKeyOneAndSSLPublicKeyTwoAndSSLPublicError(applicationSecret: string, rootViewController: UIViewController, baseUrl: string, pinningType: SSL_PINNING_TYPE, sslPinningKeyOne: string, sslPinningKeyTwo: string, sslPinningErrorMessage: string): IrisChatLib;

	static initIrisChatLibraryWithSecretRootViewControllerAndBaseURLAndSLLPinningAndSSLPublicKeyOneAndSSLPublicKeyTwoAndSSLPublicErrorAndHTTPHeadersDictionary(applicationSecret: string, rootViewController: UIViewController, baseUrl: string, pinningType: SSL_PINNING_TYPE, sslPinningKeyOne: string, sslPinningKeyTwo: string, sslPinningErrorMessage: string, httpHeaders: NSDictionary<any, any>): IrisChatLib;

	static new(): IrisChatLib; // inherited from NSObject

	static sharedInstance(): IrisChatLib;

	applicationSecret: string;

	basePath: string;

	baseUrl: string;

	delegate: IrisChatLibDelegate;

	deviceTokenRegistered: boolean;

	offlineMessagingEnabled: boolean;

	toolbarEnabled: boolean;

	applicationDidReceiveRemoteNotification(userInfo: NSDictionary<any, any>): void;

	applicationDidRegisterForRemoteNotificationsWithDeviceToken(deviceToken: string): void;

	deregisterUser(): void;

	irisChatNavigationControllerWithTitle(title: string): ICNavigationController;

	prepareIrisChat(): void;

	registerDeviceIfNotRegistered(): void;

	registerUserAdditionalInformation(uniqueUserIdentifier: string, additionalInformation: NSDictionary<any, any>): void;

	setBasePath(basePath: string): void;

	setBaseUrl(baseUrl: string): void;

	setHttpHeaders(httpHeaders: NSDictionary<any, any>): void;

	setHttpHeadersDictionary(httpHeaders: NSDictionary<any, any>): void;

	setToolbarEnabled(toolbarEnabled: boolean): void;
}

interface IrisChatLibDelegate extends NSObjectProtocol {

	irisChatLibDidRetrieveConfiguration?(): void;

	irisChatLibDidStart(irisChatLib: IrisChatLib): void;

	irisChatLibFailedToStartWithError?(irisChatLib: IrisChatLib, error: NSError): void;

	irisChatLibFailedToSubscribeDeviceWithError?(irisChatLib: IrisChatLib, error: NSError): void;

	irisChatLibFailedToVerifySSLPin?(irisChatLib: IrisChatLib, error: NSError): void;

	userDidSentMessage?(): void;

	userIsNotAuthorized?(): void;
}
declare var IrisChatLibDelegate: {

	prototype: IrisChatLibDelegate;
};

declare const enum SLKCounterPosition {

	Top = 0,

	Bottom = 1
}

declare const enum SLKCounterStyle {

	None = 0,

	Split = 1,

	Countdown = 2,

	CountdownReversed = 3
}

declare class SLKInputAccessoryView extends UIView {

	static alloc(): SLKInputAccessoryView; // inherited from NSObject

	static appearance(): SLKInputAccessoryView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): SLKInputAccessoryView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): SLKInputAccessoryView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): SLKInputAccessoryView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): SLKInputAccessoryView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): SLKInputAccessoryView; // inherited from UIAppearance

	static new(): SLKInputAccessoryView; // inherited from NSObject

	static slk_currentFirstResponder(): SLKInputAccessoryView; // inherited from UIResponder

	readonly keyboardViewProxy: UIView;
}

declare var SLKKeyboardDidHideNotification: string;

declare var SLKKeyboardDidShowNotification: string;

declare const enum SLKKeyboardStatus {

	DidHide = 0,

	WillShow = 1,

	DidShow = 2,

	WillHide = 3
}

declare var SLKKeyboardWillHideNotification: string;

declare var SLKKeyboardWillShowNotification: string;

declare const enum SLKPastableMediaType {

	None = 0,

	PNG = 1,

	JPEG = 2,

	TIFF = 4,

	GIF = 8,

	MOV = 16,

	Passbook = 32,

	Images = 15,

	Videos = 16,

	All = 31
}

interface SLKTextInput extends UITextInput {

	lookForPrefixesCompletion?(prefixes: NSSet<any>, completion: (p1: string, p2: string, p3: NSRange) => void): void;

	wordAtCaretRange?(range: interop.Pointer | interop.Reference<NSRange>): string;

	wordAtRangeRangeInText?(range: NSRange, rangePointer: interop.Pointer | interop.Reference<NSRange>): string;
}
declare var SLKTextInput: {

	prototype: SLKTextInput;
};

declare class SLKTextInputbar extends UIToolbar {

	static alloc(): SLKTextInputbar; // inherited from NSObject

	static appearance(): SLKTextInputbar; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): SLKTextInputbar; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): SLKTextInputbar; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): SLKTextInputbar; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): SLKTextInputbar; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): SLKTextInputbar; // inherited from UIAppearance

	static new(): SLKTextInputbar; // inherited from NSObject

	static slk_currentFirstResponder(): SLKTextInputbar; // inherited from UIResponder

	readonly appropriateHeight: number;

	autoHideRightButton: boolean;

	bounces: boolean;

	readonly charCountLabel: UILabel;

	charCountLabelNormalColor: UIColor;

	charCountLabelWarningColor: UIColor;

	contentInset: UIEdgeInsets;

	counterPosition: SLKCounterPosition;

	counterStyle: SLKCounterStyle;

	editing: boolean;

	editorContentView: UIView;

	editorContentViewHeight: number;

	editorLeftButton: UIButton;

	editorRightButton: UIButton;

	editorTitle: UILabel;

	inputAccessoryView: SLKInputAccessoryView;

	leftButton: UIButton;

	readonly limitExceeded: boolean;

	maxCharCount: number;

	readonly minimumInputbarHeight: number;

	rightButton: UIButton;

	textView: SLKTextView;

	constructor(o: { textViewClass: typeof NSObject; });

	beginTextEditing(): void;

	canEditText(text: string): boolean;

	endTextEdition(): void;

	initWithTextViewClass(textViewClass: typeof NSObject): this;
}

declare var SLKTextInputbarDidMoveNotification: string;

declare class SLKTextView extends UITextView implements SLKTextInput {

	static alloc(): SLKTextView; // inherited from NSObject

	static appearance(): SLKTextView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): SLKTextView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): SLKTextView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): SLKTextView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): SLKTextView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): SLKTextView; // inherited from UIAppearance

	static new(): SLKTextView; // inherited from NSObject

	static slk_currentFirstResponder(): SLKTextView; // inherited from UIResponder

	delegate: any;

	didNotResignFirstResponder: boolean;

	dynamicTypeEnabled: boolean;

	readonly formattingEnabled: boolean;

	readonly isExpanding: boolean;

	loupeVisible: boolean;

	maxNumberOfLines: number;

	readonly numberOfLines: number;

	pastableMediaTypes: SLKPastableMediaType;

	placeholder: string;

	placeholderColor: UIColor;

	readonly registeredSymbols: NSArray<any>;

	readonly trackpadEnabled: boolean;

	typingSuggestionEnabled: boolean;

	undoManagerEnabled: boolean;

	autocapitalizationType: UITextAutocapitalizationType; // inherited from UITextInputTraits

	autocorrectionType: UITextAutocorrectionType; // inherited from UITextInputTraits

	readonly beginningOfDocument: UITextPosition; // inherited from UITextInput

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	enablesReturnKeyAutomatically: boolean; // inherited from UITextInputTraits

	readonly endOfDocument: UITextPosition; // inherited from UITextInput

	readonly hasText: boolean; // inherited from UIKeyInput

	readonly hash: number; // inherited from NSObjectProtocol

	inputDelegate: UITextInputDelegate; // inherited from UITextInput

	readonly insertDictationResultPlaceholder: any; // inherited from UITextInput

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	keyboardAppearance: UIKeyboardAppearance; // inherited from UITextInputTraits

	keyboardType: UIKeyboardType; // inherited from UITextInputTraits

	readonly markedTextRange: UITextRange; // inherited from UITextInput

	markedTextStyle: NSDictionary<string, any>; // inherited from UITextInput

	passwordRules: UITextInputPasswordRules; // inherited from UITextInputTraits

	returnKeyType: UIReturnKeyType; // inherited from UITextInputTraits

	secureTextEntry: boolean; // inherited from UITextInputTraits

	selectedTextRange: UITextRange; // inherited from UITextInput

	selectionAffinity: UITextStorageDirection; // inherited from UITextInput

	smartDashesType: UITextSmartDashesType; // inherited from UITextInputTraits

	smartInsertDeleteType: UITextSmartInsertDeleteType; // inherited from UITextInputTraits

	smartQuotesType: UITextSmartQuotesType; // inherited from UITextInputTraits

	spellCheckingType: UITextSpellCheckingType; // inherited from UITextInputTraits

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	textContentType: string; // inherited from UITextInputTraits

	readonly textInputView: UIView; // inherited from UITextInput

	readonly tokenizer: UITextInputTokenizer; // inherited from UITextInput

	readonly  // inherited from NSObjectProtocol

	baseWritingDirectionForPositionInDirection(position: UITextPosition, direction: UITextStorageDirection): UITextWritingDirection;

	beginFloatingCursorAtPoint(point: CGPoint): void;

	caretRectForPosition(position: UITextPosition): CGRect;

	characterOffsetOfPositionWithinRange(position: UITextPosition, range: UITextRange): number;

	characterRangeAtPoint(point: CGPoint): UITextRange;

	characterRangeByExtendingPositionInDirection(position: UITextPosition, direction: UITextLayoutDirection): UITextRange;

	class(): typeof NSObject;

	closestPositionToPoint(point: CGPoint): UITextPosition;

	closestPositionToPointWithinRange(point: CGPoint, range: UITextRange): UITextPosition;

	comparePositionToPosition(position: UITextPosition, other: UITextPosition): NSComparisonResult;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	deleteBackward(): void;

	dictationRecognitionFailed(): void;

	dictationRecordingDidEnd(): void;

	didPressArrowKey(keyCommand: UIKeyCommand): void;

	endFloatingCursor(): void;

	firstRectForRange(range: UITextRange): CGRect;

	frameForDictationResultPlaceholder(placeholder: any): CGRect;

	insertDictationResult(dictationResult: NSArray<UIDictationPhrase>): void;

	insertText(text: string): void;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	lookForPrefixesCompletion(prefixes: NSSet<any>, completion: (p1: string, p2: string, p3: NSRange) => void): void;

	observeKeyInputModifiersTitleCompletion(input: string, modifiers: UIKeyModifierFlags, title: string, completion: (p1: UIKeyCommand) => void): void;

	offsetFromPositionToPosition(from: UITextPosition, toPosition: UITextPosition): number;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	positionFromPositionInDirectionOffset(position: UITextPosition, direction: UITextLayoutDirection, offset: number): UITextPosition;

	positionFromPositionOffset(position: UITextPosition, offset: number): UITextPosition;

	positionWithinRangeAtCharacterOffset(range: UITextRange, offset: number): UITextPosition;

	positionWithinRangeFarthestInDirection(range: UITextRange, direction: UITextLayoutDirection): UITextPosition;

	refreshFirstResponder(): void;

	refreshInputViews(): void;

	registerMarkdownFormattingSymbolWithTitle(symbol: string, title: string): void;

	removeDictationResultPlaceholderWillInsertResult(placeholder: any, willInsertResult: boolean): void;

	replaceRangeWithText(range: UITextRange, text: string): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	selectionRectsForRange(range: UITextRange): NSArray<UITextSelectionRect>;

	self(): this;

	setBaseWritingDirectionForRange(writingDirection: UITextWritingDirection, range: UITextRange): void;

	setMarkedTextSelectedRange(markedText: string, selectedRange: NSRange): void;

	shouldChangeTextInRangeReplacementText(range: UITextRange, text: string): boolean;

	slk_clearText(clearUndo: boolean): void;

	slk_insertNewLineBreak(): void;

	slk_insertTextAtCaretRange(text: string): void;

	slk_insertTextInRange(text: string, range: NSRange): NSRange;

	slk_prepareForUndo(description: string): void;

	slk_scrollToCaretPositonAnimated(animated: boolean): void;

	textInRange(range: UITextRange): string;

	textRangeFromPositionToPosition(fromPosition: UITextPosition, toPosition: UITextPosition): UITextRange;

	textStylingAtPositionInDirection(position: UITextPosition, direction: UITextStorageDirection): NSDictionary<string, any>;

	unmarkText(): void;

	updateFloatingCursorAtPoint(point: CGPoint): void;

	wordAtCaretRange(range: interop.Pointer | interop.Reference<NSRange>): string;

	wordAtRangeRangeInText(range: NSRange, rangePointer: interop.Pointer | interop.Reference<NSRange>): string;
}

declare var SLKTextViewContentSizeDidChangeNotification: string;

declare class SLKTextViewController extends UIViewController implements SLKTextViewDelegate, UIAlertViewDelegate, UICollectionViewDataSource, UICollectionViewDelegate, UIGestureRecognizerDelegate, UITableViewDataSource, UITableViewDelegate {

	static alloc(): SLKTextViewController; // inherited from NSObject

	static clearAllCachedText(): void;

	static collectionViewLayoutForCoder(decoder: NSCoder): UICollectionViewLayout;

	static new(): SLKTextViewController; // inherited from NSObject

	static slk_currentFirstResponder(): SLKTextViewController; // inherited from UIResponder

	static tableViewStyleForCoder(decoder: NSCoder): UITableViewStyle;

	readonly autoCompleting: boolean;

	readonly autoCompletionView: UITableView;

	bounces: boolean;

	readonly collectionView: UICollectionView;

	readonly editing: boolean;

	readonly externalKeyboardDetected: boolean;

	readonly foundPrefix: string;

	readonly foundPrefixRange: NSRange;

	readonly foundWord: string;

	inverted: boolean;

	keyboardPanningEnabled: boolean;

	readonly keyboardStatus: SLKKeyboardStatus;

	readonly keyboardUndocked: boolean;

	readonly leftButton: UIButton;

	presentedInPopover: boolean;

	readonly registeredPrefixes: NSSet<any>;

	readonly rightButton: UIButton;

	readonly scrollView: UIScrollView;

	shakeToClearEnabled: boolean;

	shouldClearTextAtRightButtonPress: boolean;

	shouldScrollToBottomAfterKeyboardShows: boolean;

	readonly singleTapGesture: UIGestureRecognizer;

	readonly tableView: UITableView;

	readonly textInputbar: SLKTextInputbar;

	textInputbarHidden: boolean;

	readonly textView: SLKTextView;

	readonly typingIndicatorProxyView: UIView;

	readonly typingIndicatorView: SLKTypingIndicatorView;

	readonly verticalPanGesture: UIPanGestureRecognizer;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { collectionViewLayout: UICollectionViewLayout; });

	constructor(o: { scrollView: UIScrollView; });

	constructor(o: { tableViewStyle: UITableViewStyle; });

	acceptAutoCompletionWithString(string: string): void;

	acceptAutoCompletionWithStringKeepPrefix(string: string, keepPrefix: boolean): void;

	alertViewCancel(alertView: UIAlertView): void;

	alertViewClickedButtonAtIndex(alertView: UIAlertView, buttonIndex: number): void;

	alertViewDidDismissWithButtonIndex(alertView: UIAlertView, buttonIndex: number): void;

	alertViewShouldEnableFirstOtherButton(alertView: UIAlertView): boolean;

	alertViewWillDismissWithButtonIndex(alertView: UIAlertView, buttonIndex: number): void;

	canPressRightButton(): boolean;

	canShowTypingIndicator(): boolean;

	cancelAutoCompletion(): void;

	class(): typeof NSObject;

	clearCachedText(): void;

	collectionViewCanFocusItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewCanMoveItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewCanPerformActionForItemAtIndexPathWithSender(collectionView: UICollectionView, action: string, indexPath: NSIndexPath, sender: any): boolean;

	collectionViewCellForItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): UICollectionViewCell;

	collectionViewDidDeselectItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewDidEndDisplayingCellForItemAtIndexPath(collectionView: UICollectionView, cell: UICollectionViewCell, indexPath: NSIndexPath): void;

	collectionViewDidEndDisplayingSupplementaryViewForElementOfKindAtIndexPath(collectionView: UICollectionView, view: UICollectionReusableView, elementKind: string, indexPath: NSIndexPath): void;

	collectionViewDidHighlightItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewDidSelectItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewDidUnhighlightItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewDidUpdateFocusInContextWithAnimationCoordinator(collectionView: UICollectionView, context: UICollectionViewFocusUpdateContext, coordinator: UIFocusAnimationCoordinator): void;

	collectionViewIndexPathForIndexTitleAtIndex(collectionView: UICollectionView, title: string, index: number): NSIndexPath;

	collectionViewMoveItemAtIndexPathToIndexPath(collectionView: UICollectionView, sourceIndexPath: NSIndexPath, destinationIndexPath: NSIndexPath): void;

	collectionViewNumberOfItemsInSection(collectionView: UICollectionView, section: number): number;

	collectionViewPerformActionForItemAtIndexPathWithSender(collectionView: UICollectionView, action: string, indexPath: NSIndexPath, sender: any): void;

	collectionViewShouldDeselectItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewShouldHighlightItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewShouldSelectItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewShouldShowMenuForItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewShouldSpringLoadItemAtIndexPathWithContext(collectionView: UICollectionView, indexPath: NSIndexPath, context: UISpringLoadedInteractionContext): boolean;

	collectionViewShouldUpdateFocusInContext(collectionView: UICollectionView, context: UICollectionViewFocusUpdateContext): boolean;

	collectionViewTargetContentOffsetForProposedContentOffset(collectionView: UICollectionView, proposedContentOffset: CGPoint): CGPoint;

	collectionViewTargetIndexPathForMoveFromItemAtIndexPathToProposedIndexPath(collectionView: UICollectionView, originalIndexPath: NSIndexPath, proposedIndexPath: NSIndexPath): NSIndexPath;

	collectionViewTransitionLayoutForOldLayoutNewLayout(collectionView: UICollectionView, fromLayout: UICollectionViewLayout, toLayout: UICollectionViewLayout): UICollectionViewTransitionLayout;

	collectionViewViewForSupplementaryElementOfKindAtIndexPath(collectionView: UICollectionView, kind: string, indexPath: NSIndexPath): UICollectionReusableView;

	collectionViewWillDisplayCellForItemAtIndexPath(collectionView: UICollectionView, cell: UICollectionViewCell, indexPath: NSIndexPath): void;

	collectionViewWillDisplaySupplementaryViewForElementKindAtIndexPath(collectionView: UICollectionView, view: UICollectionReusableView, elementKind: string, indexPath: NSIndexPath): void;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	didCancelTextEditing(sender: any): void;

	didChangeAutoCompletionPrefixAndWord(prefix: string, word: string): void;

	didChangeKeyboardStatus(status: SLKKeyboardStatus): void;

	didCommitTextEditing(sender: any): void;

	didPasteMediaContent(userInfo: NSDictionary<any, any>): void;

	didPresentAlertView(alertView: UIAlertView): void;

	didPressArrowKey(keyCommand: UIKeyCommand): void;

	didPressEscapeKey(keyCommand: UIKeyCommand): void;

	didPressLeftButton(sender: any): void;

	didPressReturnKey(keyCommand: UIKeyCommand): void;

	didPressRightButton(sender: any): void;

	dismissKeyboard(animated: boolean): void;

	editText(text: string): void;

	forceTextInputbarAdjustmentForResponder(responder: UIResponder): boolean;

	gestureRecognizerShouldBeRequiredToFailByGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

	gestureRecognizerShouldBegin(gestureRecognizer: UIGestureRecognizer): boolean;

	gestureRecognizerShouldReceivePress(gestureRecognizer: UIGestureRecognizer, press: UIPress): boolean;

	gestureRecognizerShouldReceiveTouch(gestureRecognizer: UIGestureRecognizer, touch: UITouch): boolean;

	gestureRecognizerShouldRecognizeSimultaneouslyWithGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

	gestureRecognizerShouldRequireFailureOfGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

	heightForAutoCompletionView(): number;

	ignoreTextInputbarAdjustment(): boolean;

	indexPathForPreferredFocusedViewInCollectionView(collectionView: UICollectionView): NSIndexPath;

	indexPathForPreferredFocusedViewInTableView(tableView: UITableView): NSIndexPath;

	indexTitlesForCollectionView(collectionView: UICollectionView): NSArray<string>;

	initWithCollectionViewLayout(layout: UICollectionViewLayout): this;

	initWithScrollView(scrollView: UIScrollView): this;

	initWithTableViewStyle(style: UITableViewStyle): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	keyForTextCaching(): string;

	maximumHeightForAutoCompletionView(): number;

	numberOfSectionsInCollectionView(collectionView: UICollectionView): number;

	numberOfSectionsInTableView(tableView: UITableView): number;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	presentKeyboard(animated: boolean): void;

	registerClassForTextView(aClass: typeof NSObject): void;

	registerClassForTypingIndicatorView(aClass: typeof NSObject): void;

	registerPrefixesForAutoCompletion(prefixes: NSArray<any>): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	scrollViewDidChangeAdjustedContentInset(scrollView: UIScrollView): void;

	scrollViewDidEndDecelerating(scrollView: UIScrollView): void;

	scrollViewDidEndDraggingWillDecelerate(scrollView: UIScrollView, decelerate: boolean): void;

	scrollViewDidEndScrollingAnimation(scrollView: UIScrollView): void;

	scrollViewDidEndZoomingWithViewAtScale(scrollView: UIScrollView, view: UIView, scale: number): void;

	scrollViewDidScroll(scrollView: UIScrollView): void;

	scrollViewDidScrollToTop(scrollView: UIScrollView): void;

	scrollViewDidZoom(scrollView: UIScrollView): void;

	scrollViewShouldScrollToTop(scrollView: UIScrollView): boolean;

	scrollViewWillBeginDecelerating(scrollView: UIScrollView): void;

	scrollViewWillBeginDragging(scrollView: UIScrollView): void;

	scrollViewWillBeginZoomingWithView(scrollView: UIScrollView, view: UIView): void;

	scrollViewWillEndDraggingWithVelocityTargetContentOffset(scrollView: UIScrollView, velocity: CGPoint, targetContentOffset: interop.Pointer | interop.Reference<CGPoint>): void;

	sectionIndexTitlesForTableView(tableView: UITableView): NSArray<string>;

	self(): this;

	setTextInputbarHiddenAnimated(hidden: boolean, animated: boolean): void;

	shouldProcessTextForAutoCompletion(text: string): boolean;

	showAutoCompletionView(show: boolean): void;

	tableViewAccessoryButtonTappedForRowWithIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewAccessoryTypeForRowWithIndexPath(tableView: UITableView, indexPath: NSIndexPath): UITableViewCellAccessoryType;

	tableViewCanEditRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean;

	tableViewCanFocusRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean;

	tableViewCanMoveRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean;

	tableViewCanPerformActionForRowAtIndexPathWithSender(tableView: UITableView, action: string, indexPath: NSIndexPath, sender: any): boolean;

	tableViewCellForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): UITableViewCell;

	tableViewCommitEditingStyleForRowAtIndexPath(tableView: UITableView, editingStyle: UITableViewCellEditingStyle, indexPath: NSIndexPath): void;

	tableViewDidDeselectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewDidEndDisplayingCellForRowAtIndexPath(tableView: UITableView, cell: UITableViewCell, indexPath: NSIndexPath): void;

	tableViewDidEndDisplayingFooterViewForSection(tableView: UITableView, view: UIView, section: number): void;

	tableViewDidEndDisplayingHeaderViewForSection(tableView: UITableView, view: UIView, section: number): void;

	tableViewDidEndEditingRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewDidHighlightRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewDidSelectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewDidUnhighlightRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewDidUpdateFocusInContextWithAnimationCoordinator(tableView: UITableView, context: UITableViewFocusUpdateContext, coordinator: UIFocusAnimationCoordinator): void;

	tableViewEditActionsForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): NSArray<UITableViewRowAction>;

	tableViewEditingStyleForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): UITableViewCellEditingStyle;

	tableViewEstimatedHeightForFooterInSection(tableView: UITableView, section: number): number;

	tableViewEstimatedHeightForHeaderInSection(tableView: UITableView, section: number): number;

	tableViewEstimatedHeightForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): number;

	tableViewHeightForFooterInSection(tableView: UITableView, section: number): number;

	tableViewHeightForHeaderInSection(tableView: UITableView, section: number): number;

	tableViewHeightForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): number;

	tableViewIndentationLevelForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): number;

	tableViewLeadingSwipeActionsConfigurationForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): UISwipeActionsConfiguration;

	tableViewMoveRowAtIndexPathToIndexPath(tableView: UITableView, sourceIndexPath: NSIndexPath, destinationIndexPath: NSIndexPath): void;

	tableViewNumberOfRowsInSection(tableView: UITableView, section: number): number;

	tableViewPerformActionForRowAtIndexPathWithSender(tableView: UITableView, action: string, indexPath: NSIndexPath, sender: any): void;

	tableViewSectionForSectionIndexTitleAtIndex(tableView: UITableView, title: string, index: number): number;

	tableViewShouldHighlightRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean;

	tableViewShouldIndentWhileEditingRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean;

	tableViewShouldShowMenuForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean;

	tableViewShouldSpringLoadRowAtIndexPathWithContext(tableView: UITableView, indexPath: NSIndexPath, context: UISpringLoadedInteractionContext): boolean;

	tableViewShouldUpdateFocusInContext(tableView: UITableView, context: UITableViewFocusUpdateContext): boolean;

	tableViewTargetIndexPathForMoveFromRowAtIndexPathToProposedIndexPath(tableView: UITableView, sourceIndexPath: NSIndexPath, proposedDestinationIndexPath: NSIndexPath): NSIndexPath;

	tableViewTitleForDeleteConfirmationButtonForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): string;

	tableViewTitleForFooterInSection(tableView: UITableView, section: number): string;

	tableViewTitleForHeaderInSection(tableView: UITableView, section: number): string;

	tableViewTrailingSwipeActionsConfigurationForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): UISwipeActionsConfiguration;

	tableViewViewForFooterInSection(tableView: UITableView, section: number): UIView;

	tableViewViewForHeaderInSection(tableView: UITableView, section: number): UIView;

	tableViewWillBeginEditingRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewWillDeselectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): NSIndexPath;

	tableViewWillDisplayCellForRowAtIndexPath(tableView: UITableView, cell: UITableViewCell, indexPath: NSIndexPath): void;

	tableViewWillDisplayFooterViewForSection(tableView: UITableView, view: UIView, section: number): void;

	tableViewWillDisplayHeaderViewForSection(tableView: UITableView, view: UIView, section: number): void;

	tableViewWillSelectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): NSIndexPath;

	textDidUpdate(animated: boolean): void;

	textSelectionDidChange(): void;

	textViewDidBeginEditing(textView: UITextView): void;

	textViewDidChange(textView: UITextView): void;

	textViewDidChangeSelection(textView: UITextView): void;

	textViewDidEndEditing(textView: UITextView): void;

	textViewShouldBeginEditing(textView: UITextView): boolean;

	textViewShouldChangeTextInRangeReplacementText(textView: UITextView, range: NSRange, text: string): boolean;

	textViewShouldEndEditing(textView: UITextView): boolean;

	textViewShouldInsertSuffixForFormattingWithSymbolPrefixRange(textView: SLKTextView, symbol: string, prefixRange: NSRange): boolean;

	textViewShouldInteractWithTextAttachmentInRange(textView: UITextView, textAttachment: NSTextAttachment, characterRange: NSRange): boolean;

	textViewShouldInteractWithTextAttachmentInRangeInteraction(textView: UITextView, textAttachment: NSTextAttachment, characterRange: NSRange, interaction: UITextItemInteraction): boolean;

	textViewShouldInteractWithURLInRange(textView: UITextView, URL: NSURL, characterRange: NSRange): boolean;

	textViewShouldInteractWithURLInRangeInteraction(textView: UITextView, URL: NSURL, characterRange: NSRange, interaction: UITextItemInteraction): boolean;

	textViewShouldOfferFormattingForSymbol(textView: SLKTextView, symbol: string): boolean;

	textWillUpdate(): void;

	viewForZoomingInScrollView(scrollView: UIScrollView): UIView;

	willPresentAlertView(alertView: UIAlertView): void;

	willRequestUndo(): void;
}

interface SLKTextViewDelegate extends UITextViewDelegate {

	textViewShouldInsertSuffixForFormattingWithSymbolPrefixRange?(textView: SLKTextView, symbol: string, prefixRange: NSRange): boolean;

	textViewShouldOfferFormattingForSymbol?(textView: SLKTextView, symbol: string): boolean;
}
declare var SLKTextViewDelegate: {

	prototype: SLKTextViewDelegate;
};

declare var SLKTextViewDidPasteItemNotification: string;

declare var SLKTextViewDidShakeNotification: string;

declare var SLKTextViewPastedItemContentType: string;

declare var SLKTextViewPastedItemData: string;

declare var SLKTextViewPastedItemMediaType: string;

declare var SLKTextViewSelectedRangeDidChangeNotification: string;

declare var SLKTextViewTextWillChangeNotification: string;

interface SLKTypingIndicatorProtocol extends NSObjectProtocol {

	visible: boolean;

	dismissIndicator?(): void;
}
declare var SLKTypingIndicatorProtocol: {

	prototype: SLKTypingIndicatorProtocol;
};

declare class SLKTypingIndicatorView extends UIView implements SLKTypingIndicatorProtocol {

	static alloc(): SLKTypingIndicatorView; // inherited from NSObject

	static appearance(): SLKTypingIndicatorView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): SLKTypingIndicatorView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): SLKTypingIndicatorView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): SLKTypingIndicatorView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): SLKTypingIndicatorView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): SLKTypingIndicatorView; // inherited from UIAppearance

	static new(): SLKTypingIndicatorView; // inherited from NSObject

	static slk_currentFirstResponder(): SLKTypingIndicatorView; // inherited from UIResponder

	canResignByTouch: boolean;

	contentInset: UIEdgeInsets;

	highlightFont: UIFont;

	interval: number;

	text: string;

	textColor: UIColor;

	textFont: UIFont;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	visible: boolean; // inherited from SLKTypingIndicatorProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	dismissIndicator(): void;

	insertUsername(username: string): void;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	removeUsername(username: string): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	show(show: boolean): void;
}

declare const enum SSL_PINNING_TYPE {

	NONE = 0,

	PUBLIC_KEY = 1,

	FULL_CERTIFICATE = 2
}
